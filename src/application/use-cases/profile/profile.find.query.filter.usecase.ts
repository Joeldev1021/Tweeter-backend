import { inject, injectable } from "inversify"
import { UserRepository } from "../../../infrastruture/repositories/user.repository"
import { TYPES } from "../../../types"
import { UserNotFoundException } from "../../errors/user.not.found.exception"
import { UserModel } from "../../../domain/models/user.model"
import { UsernameVO } from "../../../domain/value-objects/user/username.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TweetModel, TweetWithUserModel } from "../../../domain/models/tweet.model"
import { ReplyRepository } from "../../../infrastruture/repositories/reply.repository"
import { QueryFilterVO } from "../../../domain/value-objects/query-filter.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { ReplyWithUserModel } from "../../../domain/models/reply.model"

interface UserByFilter {
    data: TweetWithUserModel[] | ReplyWithUserModel[]
}

@injectable()
export class ProfileFindByQueryFilterUseCase {
    private tweetRepository: TweetRepository
    private replyRepository: ReplyRepository

    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository,
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.tweetRepository = tweetRepository;
        this.replyRepository = replyRepository
    }

    public async execute(userId: UuidVO, query: QueryFilterVO): Promise<TweetWithUserModel[] | null> {
        return null



    }
}