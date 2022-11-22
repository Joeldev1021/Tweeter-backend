import { inject, injectable } from "inversify"
import { UserRepository } from "../../../infrastruture/repositories/user.repository"
import { TYPES } from "../../../types"
import { UserNotFoundException } from "../../errors/user.not.found.exception"
import { UserModel } from "../../../domain/models/user.model"
import { UsernameVO } from "../../../domain/value-objects/user/username.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TweetModel } from "@domain/models/tweet.model"

interface UserWithTweet {
    user: UserModel,
    tweets: TweetModel[] | null
}

@injectable()
export class UserProfileUseCase {
    public userRepository: UserRepository
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.userRepository = userRepository;
        this.tweetRepository = tweetRepository;
    }

    public async execute(username: UsernameVO): Promise<UserWithTweet | null> {

        const user = await this.userRepository.findByUsername(username)

        if (!user) throw new UserNotFoundException()

        const findTweetByUser = await this.tweetRepository.findByOwnerId(user.id)

        return {
            user,
            tweets: findTweetByUser
        }

    }
}