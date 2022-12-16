import { inject, injectable } from 'inversify';
import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/tweet.created.event';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

@injectable()
export class TweetCreatedHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository
    ) {}

    async execute(event: TweetCreatedEvent) {
        console.log('event');
        const { ownerId, tweetId } = event.payload;
        const user = await this._userRepository.findById(new UuidVO(ownerId));
        if (!user) return null;

        user.addTweet(new UuidVO(tweetId));

        await this._userRepository.update(user);
    }
}
