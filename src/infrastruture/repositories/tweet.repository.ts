import { injectable } from "inversify"
import { TweetModel } from "../../domain/models/tweet.model"
import { ITweetRepository } from "../../domain/repository/tweet.respository"
import { CreatedAtVO } from "../../domain/value-objects/created-at.vo"
import { ContentVO } from "../../domain/value-objects/tweet/content.vo"
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
    private toDomain(persistanceTweet: ITweet): TweetModel {
        const { _id, content, ownerId, likes, createdAt } = persistanceTweet
        const likesArrayVO = likes ? likes?.map(like => new UuidVO(like)) : []
        return new TweetModel(
            new UuidVO(_id),
            new ContentVO(content),
            new UuidVO(ownerId),
            null,
            likesArrayVO,
            new CreatedAtVO(createdAt)
        )
    }
    /**
     * It takes a TweetModel and returns a TweetPersistance
     * @param {TweetModel} domainTweet - TweetModel - this is the domain model that we want to convert to a
     * persistance model.
     * @returns A TweetModel object
     */

    private toPersistance(domainTweet: TweetModel) {
        const { id, content, ownerId, likes, createdAt } = domainTweet
        const likesValues = likes ? likes.map(like => like.value) : []
        return {
            _id: id.value,
            content: content.value,
            ownerId: ownerId.value,
            likes: likesValues,
            createdAt: createdAt.value
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
        const newTweet = new TweetSchema(tweetPersistance)
        return this.toDomain(await newTweet.save())
    }

    /**
     * > It finds a tweet by its id and returns it as a domain model
     * @param {UuidVO} id - UuidVO - The id of the tweet we want to find.
     * @returns TweetModel | undefined
     */

    async findById(id: UuidVO): Promise<TweetModel | undefined> {
        const tweetFound = await TweetSchema.findById(id.value)
        if (tweetFound)
            return this.toDomain(tweetFound)
    }

    /**
     * It deletes a tweet by id.
     * @param {UuidVO} id - UuidVO
     * @returns The tweet that was deleted.
     */
    async delete(id: UuidVO): Promise<TweetModel | undefined> {
        const tweetDelete = await TweetSchema.findByIdAndDelete(id.value)
        if (tweetDelete)
            return this.toDomain(tweetDelete)
    }

    /**
     * It updates a tweet by id.
     * @param {UuidVO} id - UuidVO - The id of the tweet to be updated
     * @param {TweetModel} tweet - TweetModel - The tweet object that will be updated.
     * @returns The tweetUpdate is being returned.
     */
    async update(id: UuidVO, tweet: TweetModel): Promise<TweetModel | undefined> {
        const tweetUpdate = await TweetSchema.findByIdAndUpdate(id.value, { tweet: tweet.content.value })
        if (tweetUpdate)
            return this.toDomain(tweetUpdate)
    }

    /**
     * It returns a list of tweets that belong to a user
     * @param {UuidVO} onwerId - UuidVO
     * @returns A list of tweets
     */
    async findByOwnerId(onwerId: UuidVO): Promise<TweetModel[] | undefined> {
        const tweets = await TweetSchema.find({ onwerId: onwerId })
        if (tweets)
            return tweets.map(tweet => this.toDomain(tweet))
    }

    /**
     * It returns all the tweets in the database.
     * @returns An array of TweetModel objects.
     */
    async findAll(): Promise<TweetModel[] | undefined> {
        //const tweets = await TweetSchema.find().skip(1).limit(10);
        const tweets = await TweetSchema.find();
        if (tweets)
            return tweets.map(tweet => this.toDomain(tweet))
    }

    /**
     * It finds a tweet by its id, checks if the user has already liked it, if so, it removes the like,
     * if not, it adds the like
     * @param {UuidVO} tweetId - UuidVO - The tweet's id
     * @param {UuidVO} userId - UuidVO
     * @returns A tweet model
     */
    async like(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | undefined> {
        const tweet = await TweetSchema.findById(tweetId)
        if (tweet?.likes?.includes(userId.value)) {
            tweet.likes.filter(like => like !== userId.value)
            tweet.save()
        } else {
            tweet?.likes?.push(userId.value)
            tweet?.save()
        }
        return this.toDomain(tweet!)
    }

    /**
     * It finds a tweet by its id, populates the reply field, and returns the tweet
     * @param {UuidVO} tweetId - UuidVO - This is the tweet id that we want to find the replies for.
     * @returns The tweet with the replies
     */
    async findAllReply(tweetId: UuidVO): Promise<TweetModel | undefined> {
        const tweetReplys = await TweetSchema.findById(tweetId.value).populate([{
            path: "reply",
            populate: {
                path: "ownerId",
                select: ["username", "avatar"]
            }
        }])

        if (tweetReplys)
            return this.toDomain(tweetReplys)
    }
}
