import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { TweetVO } from "../../../domain/value-objects/tweet/tweet.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"
@injectable()
export class TweetDeleteByIdUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(id: string, userId: string): Promise<TweetModel | undefined> {

        const tweetId = new UuidVO(id)
        const onwerId = new UuidVO(userId)

        const tweetFound = await this.tweetRepository.findById(tweetId)
        if (!tweetFound) throw new TweetNotFoundException()

        if (tweetFound.ownerId.value === onwerId.value) {
            return this.tweetRepository.delete(tweetId)
        }

    }
}
