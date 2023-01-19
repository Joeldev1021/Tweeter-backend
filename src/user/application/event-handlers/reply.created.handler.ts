import { inject, injectable } from 'inversify';
import { ReplyCreatedEvent } from '../../../shared/domain/events/reply/reply.created.event';
import { IDomainEventClass } from '../../../shared/domain/types/domain-event-class';
import { EventHandler } from '../../../shared/domain/types/event-handler.interface';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { ITweetRepository } from '../../../tweet/domain/repository/tweet.respository';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

@injectable()
export class ReplyCreatedHandler implements EventHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: IUserRepository,
        @inject(TYPES.TweetRepository)
        private readonly _tweetRepository: ITweetRepository
    ) {}

    subscribedTo(): IDomainEventClass[] {
        return [ReplyCreatedEvent];
    }

    async handle(event: ReplyCreatedEvent): Promise<void> {
        const { ownerId, replyId, tweetId } = event.payload;
        console.log('event reply', event);
        const user = await this._userRepository.findById(new UuidVO(ownerId));
        const tweet = await this._tweetRepository.findById(new UuidVO(tweetId));

        if (!user) return;
        user.addReply(new UuidVO(replyId));

        if (!tweet) return;

        tweet.addReply(new UuidVO(replyId));

        await this._userRepository.update(user);
        await this._tweetRepository.update(tweet.id, tweet);
        //user?.replyIds(replyId)
    }
}
