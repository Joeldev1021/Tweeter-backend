import { injectable } from "inversify"
import { TweetModel } from "../../domain/models/tweet.model"
import { ITweetRepository } from "../../domain/repository/tweet.respository"
import { TweetVO } from "../../domain/value-objects/tweet/tweet.vo"
import { UuidVO } from "../../domain/value-objects/uuid.vo"
import { TweetSchema } from "../schemas/tweet.schema"
import { ITweet } from "../types/schemas/tweeter-doc.interface"

@injectable()
export class TweetRepository implements ITweetRepository {


    /**
     * It takes a tweet from the database and converts it into a TweetModel
     * @param {ITweet} persistanceTweet - ITweet
     * @returns A TweetModel
     */
    private toDomian(persistanceTweet: ITweet): TweetModel {
        const { _id, tweet } = persistanceTweet
        return new TweetModel(
            new UuidVO(_id),
            new TweetVO(tweet)
        )
    }


    /**
     * It takes a TweetModel and returns a TweetPersistance
     * @param {TweetModel} domainTweet - TweetModel - this is the domain model that we want to convert to a
     * persistance model.
     * @returns A TweetModel object
     */

    private toPersistance(domainTweet: TweetModel) {
        return {
            _id: domainTweet.id.value,
            tweet: domainTweet.tweet.value
        }
    }

    /**
     * It takes a TweetModel, converts it to a TweetPersistance, and then converts that TweetPersistance
     * to a TweetModel
     * @param {TweetModel} tweet - TweetModel - this is the tweet object that we are going to create.
     * @returns A promise of a tweet model or undefined
     */
    async create(tweet: TweetModel): Promise<TweetModel | undefined> {

        const tweetPersistance = this.toPersistance(tweet)
        return this.toDomian(new TweetSchema(tweetPersistance))
    }

    /**
     * > It finds a tweet by its id and returns it as a domain model
     * @param {UuidVO} id - UuidVO - The id of the tweet we want to find.
     * @returns TweetModel | undefined
     */

    async findById(id: UuidVO): Promise<TweetModel | undefined> {
        const tweetFound = await TweetSchema.findById(id.value)
        if (tweetFound)
            return this.toDomian(tweetFound)
    }

    /**
     * It deletes a tweet by id.
     * @param {UuidVO} id - UuidVO
     * @returns The tweet that was deleted.
     */
    async delete(id: UuidVO): Promise<TweetModel | undefined> {
        const tweetDelete = await TweetSchema.findByIdAndDelete(id.value)
        if (tweetDelete)
            return this.toDomian(tweetDelete)
    }

    /**
     * It updates a tweet by id.
     * @param {UuidVO} id - UuidVO - The id of the tweet to be updated
     * @param {TweetModel} tweet - TweetModel - The tweet object that will be updated.
     * @returns The tweetUpdate is being returned.
     */
    async update(id: UuidVO, tweet: TweetModel): Promise<TweetModel | undefined> {
        const tweetUpdate = await TweetSchema.findByIdAndUpdate(id.value, tweet.tweet)
        if (tweetUpdate)
            return this.toDomian(tweetUpdate)
    }

}


