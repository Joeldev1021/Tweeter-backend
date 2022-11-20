import { inject, injectable } from "inversify"
import { ReplyModel } from "../../../domain/models/reply.model"
import { ContentVO } from "../../../domain/value-objects/tweet/content.vo"
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
        this.tweetRepository = tweetRepository;
        this.replyRepository = replyRepository;
    }

    public async execute(id: UuidVO, content: ContentVO, tweeId: UuidVO, ownerId: UuidVO): Promise<ReplyModel | undefined> {
        const foundTweet = await this.tweetRepository.findById(tweeId)
        if (!foundTweet) throw new TweetNotFoundException()

        return this.replyRepository.create(new ReplyModel(id, content, tweeId, ownerId, []))

    }
}


