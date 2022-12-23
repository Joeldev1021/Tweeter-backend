import { inject, injectable } from 'inversify';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { TYPES } from '../../../types';
import { UserModel } from '../../domain/models/user.model';
import { UsernameVO } from '../../domain/value-objects/username.vo';
import { TweetRepository } from '../../../tweet/infrastruture/repository/tweet.repository';
import { TweetWithUserModel } from '../../../tweet/domain/models/tweet.model';
import { UserNotFoundException } from '../errors/user.not.found.exception';

interface IUserWithTweet {
    user: UserModel;
    tweets: TweetWithUserModel[] | null;
}

@injectable()
export class UserProfileUseCase {
    public userRepository: UserRepository;
    private tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.userRepository = userRepository;
        this.tweetRepository = tweetRepository;
    }

    public async execute(username: UsernameVO): Promise<IUserWithTweet | null> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) throw new UserNotFoundException();

        const findTweetByUser = await this.tweetRepository.findByOwnerId(
            user.id
        );

        return {
            user,
            tweets: findTweetByUser,
        };
    }
}
