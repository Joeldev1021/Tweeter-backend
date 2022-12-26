import { inject, injectable } from 'inversify';
import { DomainEvent } from '../../../shared/domain/events/domain.event';
import { UserFollowingAfterEvent } from '../../../shared/domain/events/user/user.follower.after.event';
import { UserUnfollowedEvent } from '../../../shared/domain/events/user/user.unfollowed.event';
import { IDomainEventClass } from '../../../shared/domain/types/domain-event-class';
import { EventHandler } from '../../../shared/domain/types/event-handler.interface';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

@injectable()
export class UserUnfollowedHandler implements EventHandler {
    constructor(
        @inject(TYPES.UserRepository) private _userRepository: IUserRepository
    ) {}

    subscribedTo(): IDomainEventClass[] {
        return [UserUnfollowedEvent];
    }

    async handle(event: UserUnfollowedEvent): Promise<void> {
        const { userId, unfollowId } = event.payload;
        const followingFound = await this._userRepository.findById(
            new UuidVO(unfollowId)
        );

        if (!followingFound) return;

        followingFound.removeFollower(new UuidVO(userId));

        await this._userRepository.update(followingFound);
    }
}
