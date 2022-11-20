import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { ReplyRepository } from "../../../infrastruture/repositories/reply.repository"
import { ReplyModel } from "@domain/models/reply.model"
import { inject, injectable } from "inversify"
import { TYPES } from "../../../types"


@injectable()
export class ReplyLikeUseCase {
    private replyRepository: ReplyRepository
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository
    }

    public async execute(replyId: UuidVO, userId: UuidVO): Promise<ReplyModel | undefined> {

        const replyFound = await this.replyRepository.findById(replyId)
        if (!replyFound) throw new TweetNotFoundException()

        return await this.replyRepository.like(replyId, userId)
    }
}