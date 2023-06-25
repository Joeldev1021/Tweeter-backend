import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../apps/backend/dependency-injection/Types';
import { UserRepository } from '../../domain/repository/UserRepository';
import { IEventBus } from '../../../shared/domain/types/IEventBus';
import { UserNotFoundException } from '../errors/UserNotFoundException';
import { UserId } from '../../../shared/domain/valueObjects/UserId';

@injectable()
export class UserFollowingUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: UserRepository,
        @inject(TYPES.EventBus) private readonly _eventBus: IEventBus
    ) {}

    public async execute(userId: UserId, followingId: UserId): Promise<void> {
        const userFound = await this._userRepository.findById(followingId);
        if (!userFound) throw new UserNotFoundException();

        await this._userRepository.following(userId, followingId);

        userFound.followingUser(userId, followingId);
        /* publish events */
        await this._eventBus.publish(userFound.pullDomainEvents());
    }
}
