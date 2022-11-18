import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"


@injectable()
export class TweetLikeUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | undefined> {

        const tweetFound = await this.tweetRepository.findById(tweetId)
        if (!tweetFound) throw new TweetNotFoundException()

        return await this.tweetRepository.like(tweetId, userId)
    }
}