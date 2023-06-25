import { injectable } from 'inversify';
import { TweetRepository } from '../../domain/repository/TweetRepository';
import { TweetModel } from '../../domain/models/TweetModel';
import { UserId } from '../../../shared/domain/valueObjects/UserId';
import { ITweetDoc } from '../interfaces/TweetInterface';
import { TweetId } from '../../domain/valueObjects/TweetId';
import { TweetContent } from '../../domain/valueObjects/TweetContent';
import { CreatedAtVO } from '../../../shared/domain/valueObjects/CreatedAtVO';
import { TweetSchema } from '../schemas/TweetSchema';
import { Nullable } from '../../../shared/domain/valueObjects/Nullable';

@injectable()
export class TweetMongoRepository implements TweetRepository {
    async findByUserId(userId: UserId): Promise<Nullable<TweetModel>> {
        const tweet = await TweetSchema.findOne({ userId: userId.value });
        if (!tweet) return null;
        return this.toDomain(tweet);
    }

    async findAll(): Promise<Nullable<TweetModel[]>> {
        const tweets = await TweetSchema.find();
        if (!tweets) return null;

        return tweets.map(t => this.toDomain(t));
    }

    private toDomain(persistanceTweet: ITweetDoc): TweetModel {
        /* array replys Id VO */
        const likesArrayVO = persistanceTweet.likes?.map(
            (like: string) => new TweetId(like)
        );

        /* array replys Id VO */
        const ReplyArrayVO = persistanceTweet.replyIds?.map(
            (reply: string) => new TweetId(reply)
        );

        return new TweetModel(
            new TweetId(persistanceTweet._id),
            new TweetContent(persistanceTweet.content),
            new UserId(persistanceTweet.userId),
            null, //image
            new CreatedAtVO(persistanceTweet.createdAt),
            ReplyArrayVO || [],
            likesArrayVO || []
        );
    }
    /**
     * It takes a TweetModel and returns a TweetPersistance
     * @param {TweetModel} domainTweet - TweetModel - this is the domain model that we want to convert to a
     * persistance model.
     * @returns A TweetModel object
     */

    private toPersistance(domainTweet: TweetModel): ITweetDoc {
        const { id, content, userId, likes, createdAt } = domainTweet;
        const likesValues = likes ? likes.map(like => like.value) : [];
        return {
            _id: id.value,
            content: content.value,
            userId: userId.value,
            createdAt: createdAt.value,
            likes: likesValues,
        };
    }

    async save(tweet: TweetModel): Promise<void> {
        const tweetPersistance = this.toPersistance(tweet);
        const newTweet = new TweetSchema(tweetPersistance);
        await newTweet.save();
    }

    async findById(id: TweetId): Promise<Nullable<TweetModel>> {
        //todo- the tweet should get 10 first replys
        const tweetFound = await TweetSchema.findById(id.value);
        if (!tweetFound) return null;
        return this.toDomain(tweetFound);
    }

    async delete(id: TweetId): Promise<void> {
        await TweetSchema.findByIdAndDelete(id.value);
    }

    async update(id: UserId, tweet: TweetModel): Promise<void> {
        const tweetPersistance = this.toPersistance(tweet);
        const { _id, ...rest } = tweetPersistance;

        await TweetSchema.findByIdAndUpdate(_id, rest);
    }

    async addLike(tweetId: TweetId, userId: UserId): Promise<void> {
        const tweet = await TweetSchema.findById(tweetId.value);

        tweet?.likes?.push(userId.value);
    }

    async removeLike(tweetId: TweetId, userId: UserId): Promise<void> {
        const tweet = await TweetSchema.findById(tweetId.value);

        if (tweet?.likes?.includes(userId.value))
            tweet.likes = tweet.likes.filter(like => like !== userId.value);
    }
}
