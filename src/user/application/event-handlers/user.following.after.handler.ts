import { inject, injectable } from 'inversify';
import { UserFollowingAfterEvent } from '../../../shared/domain/events/user/user.follower.after.event';
import { IDomainEventClass } from '../../../shared/domain/types/domain-event-class';
import { EventHandler } from '../../../shared/domain/types/event-handler.interface';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { InMemoryAsyncEventBus } from '../../../shared/infrastruture/event/event.bus';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

@injectable()
export class UserFollowingAfterHandler implements EventHandler {
    constructor(
        @inject(TYPES.UserRepository) private _userRepository: IUserRepository
    ) {}

    subscribedTo(): IDomainEventClass[] {
        return [UserFollowingAfterEvent];
    }

    async handle(event: UserFollowingAfterEvent): Promise<void> {
        console.log('event folow', event);
        const { userId, followerId } = event.payload;
        const followingFound = await this._userRepository.findById(
            new UuidVO(followerId)
        );

        if (!followingFound) return;

        followingFound.addFollower(new UuidVO(userId));

        await this._userRepository.update(followingFound);
    }
}
