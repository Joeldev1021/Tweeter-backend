import { inject, injectable } from 'inversify';
import { DomainEventClass } from '../../../shared/domain/events/domain.event';
import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/tweet.created.event';
import { IDomainEventSubscriber } from '../../../shared/domain/types/domain.event.subscriber';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

@injectable()
export class TweetCreatedHandler
    implements IDomainEventSubscriber<TweetCreatedEvent>
{
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository
    ) {}

    subscribedTo(): DomainEventClass[] {
        return [TweetCreatedEvent];
    }

    async on(event: TweetCreatedEvent): Promise<void> {
        const { ownerId, tweetId } = event.payload;
        console.log('event -----------------------tweetCreated');
        const user = await this._userRepository.findById(new UuidVO(ownerId));
        if (!user) return;

        user.addTweet(new UuidVO(tweetId));

        await this._userRepository.update(user);
    }
}
