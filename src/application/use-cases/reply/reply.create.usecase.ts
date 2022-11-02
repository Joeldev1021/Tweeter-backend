import { inject, injectable } from "inversify"
import { ReplyModel } from "../../../domain/models/reply.model"
import { TweetModel } from "../../../domain/models/tweet.model"
import { ReplyVO } from "../../../domain/value-objects/tweet/reply.vo"
import { TweetVO } from "../../../domain/value-objects/tweet/tweet.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { ReplyRepository } from "../../../infrastruture/repositories/reply.repository"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"

@injectable()
export class ReplyCreateUseCase {
    private tweetRepository: TweetRepository
    private replyRepository: ReplyRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository,
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.tweetRepository = tweetRepository,
            this.replyRepository = replyRepository
    }

    public async execute(id: UuidVO, reply: ReplyVO, tweeId: UuidVO, ownerId: UuidVO): Promise<ReplyModel | undefined> {

        const foundTweet = await this.tweetRepository.findById(id)
        if (!foundTweet) throw new TweetNotFoundException()

        return this.replyRepository.create(new ReplyModel(id, reply, tweeId, ownerId))

    }
}


