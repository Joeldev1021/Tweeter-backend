import { inject, injectable } from "inversify"
import { TweetModel } from "../../../domain/models/tweet.model"
import { TweetRepository } from "../../../infrastruture/repositories/tweet.repository"
import { TYPES } from "../../../types"
import { TweetNotFoundException } from "../../errors/tweeter/tweet.not.found.exception"

@injectable()
export class TweetFindAllUseCase {
    private tweetRepository: TweetRepository
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository
    }

    public async execute(): Promise<TweetModel[] | undefined> {

        const findTweets = await this.tweetRepository.findAll()
        if (!findTweets) throw new TweetNotFoundException()

        return findTweets
    }
}