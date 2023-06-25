import { inject, injectable } from 'inversify';
import { UserModel } from '../../domain/models/UserModel';
import { TYPES } from '../../../../apps/backend/dependency-injection/Types';
import { UserRepository } from '../../domain/repository/UserRepository';
import { JwtServices } from '../../../shared/infrastruture/services/JwtServices';
import { IEventBus } from '../../../shared/domain/types/IEventBus';
import { UserUsername } from '../../domain/value-objects/UserUsername';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { UserIdAlreadyExistsException } from '../errors/UserIdAlreadyExistsException';
import { UserEmailAlreadyExistsException } from '../errors/UserEmailAlreadyExistException';
import { UserId } from '../../../shared/domain/valueObjects/UserId';

@injectable()
export class UserRegisterUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: UserRepository,
        @inject(TYPES.JwtService)
        private readonly _jwtService: JwtServices,
        @inject(TYPES.EventBus) private readonly _eventBus: IEventBus
    ) {}

    public async execute(
        id: UserId,
        username: UserUsername,
        email: UserEmail,
        password: UserPassword
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
