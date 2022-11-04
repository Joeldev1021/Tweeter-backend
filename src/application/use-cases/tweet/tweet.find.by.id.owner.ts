import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"


@injectable()
export class TweetFindByOwnerIdUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(ownerId: UuidVO): Promise<TweetModel[] | undefined> {

        const tweetFounds = await this.tweetRepository.findByOwnerId(ownerId)
        if (!tweetFounds) throw new TweetNotFoundException()

        return tweetFounds
    }
}