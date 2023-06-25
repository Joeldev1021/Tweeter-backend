import { inject, injectable } from 'inversify';
import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/tweet.created.event';
import { IDomainEventClass } from '../../../shared/domain/types/domain-event-class';
import { EventHandler } from '../../../shared/domain/types/event-handler.interface';
import { UuidVO } from '../../../shared/domain/valueObjects/Uuid';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/UserRepository';

@injectable()
export class TweetCreatedEventHandler implements EventHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: IUserRepository
    ) {}

    subscribedTo(): IDomainEventClass[] {
        return [TweetCreatedEvent];
    }

    async handle(event: TweetCreatedEvent): Promise<void> {
        const { userId, tweetId } = event.payload;
        const user = await this._userRepository.findById(new UuidVO(userId));
        if (!user) return;

        user.addTweet(new UuidVO(tweetId));

        await this._userRepository.update(user);
    }
}
