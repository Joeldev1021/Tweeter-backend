import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { IUserRepository } from '../../domain/repository/user.repository';
import { UserNotFoundException } from '../errors/user.not.found.exception';
import { IEventBus } from '../../../shared/domain/types/event-bus.interface';

@injectable()
export class UserFollowingUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: IUserRepository,
        @inject(TYPES.EventBus) private readonly _eventBus: IEventBus
    ) {}

    public async execute(userId: UuidVO, followingId: UuidVO): Promise<void> {
        const userFound = await this._userRepository.findById(followingId);
        if (!userFound) throw new UserNotFoundException();

        await this._userRepository.following(userId, followingId);

        userFound.followingUser(userId, followingId);
        /* publish events */
        await this._eventBus.publish(userFound.pullDomainEvents());
    }
}
