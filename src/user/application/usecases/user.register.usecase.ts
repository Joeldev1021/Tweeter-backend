import { JwtService } from '../../../shared/infrastruture/services/jwt.services';
import { inject, injectable } from 'inversify';
import { UserModel } from '../../domain/models/user.model';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { UsernameVO } from '../../domain/value-objects/username.vo';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { UserIdAlreadyExistsException } from '../errors/user.id.already.exists';
import { UserEmailAlreadyExistsException } from '../errors/user.email.already.exists.exception';
import { IUserRepository } from '../../domain/repository/user.repository';
import { IEventBus } from '../../../shared/domain/types/event-bus.interface';

@injectable()
export class UserRegisterUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: IUserRepository,
        @inject(TYPES.JwtService)
        private readonly _jwtService: JwtService,
        @inject(TYPES.EventBus) private readonly _eventBus: IEventBus
    ) {}

    public async execute(
        id: UuidVO,
        username: UsernameVO,
        email: EmailVO,
        password: PasswordVO
    ): Promise<{ token: string } | null> {
        const userFound = await this._userRepository.findById(id);
        if (userFound) throw new UserIdAlreadyExistsException();

        const userFoundEmail = await this._userRepository.findByEmail(email);
        if (userFoundEmail) throw new UserEmailAlreadyExistsException();

        const userModel = UserModel.createUser(
            id,
            username,
            email,
            password,
            [],
            [],
            [],
            []
        );
        const newUser = await this._userRepository.create(userModel);
        if (!newUser) return null;

        const token = await this._jwtService.signToken(
            { id: newUser.id.value },
            { expiresIn: '1d' }
        );
        await this._eventBus.publish(userModel.pullDomainEvents());

        return { token };
    }
}
