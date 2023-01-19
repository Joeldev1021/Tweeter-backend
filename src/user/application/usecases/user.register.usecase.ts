import { JwtService } from '../../../shared/infrastruture/services/jwt.services';
import { inject, injectable } from 'inversify';
import { UserModel } from '../../domain/models/user.model';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { UsernameVO } from '../../domain/value-objects/username.vo';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { UserIdAlreadyExistsException } from '../errors/user.id.already.exists';
import { UserEmailAlreadyExistsException } from '../errors/user.email.already.exists.exception';

@injectable()
export class UserRegisterUseCase {
    private userRepository: UserRepository;
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.JwtService) private readonly _jwtService: JwtService
    ) {
        this.userRepository = userRepository;
    }

    public async execute(
        id: UuidVO,
        username: UsernameVO,
        email: EmailVO,
        password: PasswordVO
    ): Promise<{ token: string } | null> {
        const userFound = await this.userRepository.findById(id);
        if (userFound) throw new UserIdAlreadyExistsException();

        const userFoundEmail = await this.userRepository.findByEmail(email);
        if (userFoundEmail) throw new UserEmailAlreadyExistsException();

        const newUser = await this.userRepository.create(
            new UserModel(id, username, email, password, [], [], [], [])
        );
        if (!newUser) return null;

        const token = await this._jwtService.signToken(
            { id: newUser.id.value },
            { expiresIn: '1d' }
        );

        return { token };
    }
}
