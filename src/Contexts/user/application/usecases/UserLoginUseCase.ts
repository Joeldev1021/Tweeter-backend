import { inject, injectable } from 'inversify';
import { UserRepository } from '../../domain/repository/UserRepository';
import { TYPES } from '../../../../apps/backend/dependency-injection/Types';
import { JwtServices } from '../../../shared/infrastruture/services/JwtServices';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { InvalidLoginException } from '../errors/InvalidLoginException';

@injectable()
export class UserLoginUseCase {
    public userRepository: UserRepository;
    constructor(
        @inject(TYPES.JwtService) private readonly _jwtService: JwtServices,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository;
    }

    public async execute(
        email: UserEmail,
        password: UserPassword
    ): Promise<{ token: string } | null> {
        const existsUser = await this.userRepository.findByEmail(email);
        if (!existsUser) throw new InvalidLoginException();
        const passworMatch = await existsUser.password.compare(password);
        if (!passworMatch) throw new InvalidLoginException();

        const token = await this._jwtService.signToken(
            { id: existsUser.id.value },
            { expiresIn: '1d' }
        );
        return { token };
    }
}
