import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"


@injectable()
export class TweetFindByIdUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(id: UuidVO): Promise<TweetModel | undefined> {

        const tweetFound = await this.tweetRepository.findById(id)
        if (!tweetFound) throw new TweetNotFoundException()

        return tweetFound
    }
}