import { inject, injectable } from "inversify"
import { ReplyModel } from "../../../domain/models/reply.model"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { ReplyRepository } from "../../../infrastruture/repositories/reply.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"

//TODO: owner ID
@injectable()
export class ReplyFindByOwnerIdUseCase {
    private replyRepository: ReplyRepository
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository
    }

    public async execute(ownerId: UuidVO): Promise<ReplyModel[] | undefined> {

        const replyFound = await this.replyRepository.findByOwnerId(ownerId)
        if (!replyFound) throw new TweetNotFoundException()

        return replyFound
    }
}