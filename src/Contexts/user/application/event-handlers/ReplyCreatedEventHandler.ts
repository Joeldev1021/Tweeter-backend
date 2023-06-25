import { inject, injectable } from 'inversify';
import { EventHandler } from '../../../shared/domain/types/EventHandler';
import { UserRepository } from '../../domain/repository/UserRepository';
import { TYPES } from '../../../../apps/backend/dependency-injection/Types';
import { TweetRepository } from '../../../tweet/domain/repository/TweetRepository';
import { IDomainEventClass } from '../../../shared/domain/types/IDomainEventClass';
import { ReplyCreatedEvent } from '../../../shared/domain/events/reply/ReplyCreatedEvent';
import { UserId } from '../../../shared/domain/valueObjects/UserId';

@injectable()
export class ReplyCreatedEventHandler implements EventHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: UserRepository,
        @inject(TYPES.TweetRepository)
        private readonly _tweetRepository: TweetRepository
    ) {}

    subscribedTo(): IDomainEventClass[] {
        return [ReplyCreatedEvent];
    }

    async handle(event: ReplyCreatedEvent): Promise<void> {
        const { userId, replyId, tweetId } = event.payload;
        const user = await this._userRepository.findById(new UserId(userId));
        const tweet = await this._tweetRepository.findById(
            new tweetId(tweetId)
        );

        if (!user) return;
        user.addReply(new ReplyId(replyId));

        if (!tweet) return;

        tweet.addReply(new UserReply(replyId));

        await this._userRepository.update(user);
        await this._tweetRepository.update(tweet.id, tweet);
        //user?.replyIds(replyId)
    }
}
