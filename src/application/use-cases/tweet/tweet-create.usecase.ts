import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { CreatedAtVO } from "../../../domain/value-objects/created-at.vo"
import { ContentVO } from "../../../domain/value-objects/tweet/content.vo"
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

    public async execute(id: UuidVO, tweet: ContentVO, ownerId: UuidVO): Promise<TweetModel | undefined> {

        const findTweet = await this.tweetRepository.findById(id)
        if (findTweet) throw new TweetIdAlreadyExist()
        const tweetSave = this.tweetRepository.create(new TweetModel(id, tweet, ownerId, null, [], new CreatedAtVO(new Date())))
        console.log(tweetSave)
        return tweetSave
    }
}

