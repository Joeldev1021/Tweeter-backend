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

    public async execute(id: UuidVO, tweet: TweetVO, ownerId: UuidVO): Promise<TweetModel | undefined> {

        const findTweet = await this.tweetRepository.findById(id)
        if (findTweet) throw new TweetIdAlreadyExist()

        return this.tweetRepository.create(new TweetModel(id, tweet, ownerId, null)
        )
    }
}

