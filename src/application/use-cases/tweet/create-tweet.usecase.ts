import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { TweetVO } from "../../../domain/value-objects/tweet/tweet.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetIdAlreadyExist } from "../../errors/tweeter/tweet.id.already.exists.exception"

@injectable()
export class TweetCreateUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(_id: string, tweet: string) {
        const tweetId = new UuidVO(_id)

        const findTweet = await this.tweetRepository.findById(tweetId)
        if (findTweet) throw new TweetIdAlreadyExist()

        const tweetModel = new TweetModel(
            tweetId,
            new TweetVO(tweet)
        )

    }
}

