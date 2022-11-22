import { inject, injectable } from "inversify"
import { UserRepository } from "../../../infrastruture/repositories/user.repository"
import { TYPES } from "../../../types"
import { UserNotFoundException } from "../../errors/user.not.found.exception"
import { UserModel } from "../../../domain/models/user.model"
import { UsernameVO } from "../../../domain/value-objects/user/username.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TweetModel } from "@domain/models/tweet.model"
import { ReplyRepository } from "../../../infrastruture/repositories/reply.repository"
import { QueryFilterVO } from "@domain/value-objects/query-filter.vo"

interface UserWithTweet {
    user: UserModel,
    tweets: TweetModel[] | null
}

@injectable()
export class ProfileFindByQueryFilterUseCase {
    private userRepository: UserRepository
    private tweetRepository: TweetRepository
    private replyRepository: ReplyRepository

    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository,
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.userRepository = userRepository;
        this.tweetRepository = tweetRepository;
        this.replyRepository = replyRepository
    }

    public async execute(username: UsernameVO, query: QueryFilterVO): Promise<UserWithTweet | null> {

        const user = await this.userRepository.findByUsername(username)

        if (!user) throw new UserNotFoundException()

        const findTweetByUser = await this.tweetRepository.findByOwnerId(user.id)
        const findReplys = await this.replyRepository.findByOwnerId(user.id)

        return {
            user,
            tweets: findTweetByUser
        }

    }
}