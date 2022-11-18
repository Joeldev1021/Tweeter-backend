import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { CreatedAtVO } from "../../../domain/value-objects/created-at.vo"
import { ContentVO } from "../../../domain/value-objects/tweet/content.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"


@injectable()
export class TweetUpdateByIdUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(id: UuidVO, content: ContentVO, onwerId: UuidVO): Promise<TweetModel | undefined> {


        const tweetFound = await this.tweetRepository.findById(id)
        if (!tweetFound) throw new TweetNotFoundException()

        if (tweetFound.ownerId.value === onwerId.value) {

            return this.tweetRepository.update(id, content)
        }

    }
}