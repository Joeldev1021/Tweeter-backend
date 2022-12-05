import { inject } from 'inversify';
import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/tweet.created.event';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

export class TweetCreatedHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository
    ) {}

    async execute(event: TweetCreatedEvent) {
        const { ownerId, tweetId } = event.payload;

        const user = await this._userRepository.findById(new UuidVO(ownerId));

        if (!user) return null;

        user.addTweet(new UuidVO(tweetId));

        await this._userRepository.update(user);
    }
}
