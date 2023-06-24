import { UsernameVO } from '../../../user/domain/value-objects/UserUsername';
import { injectable } from 'inversify';
import {
    TweetModel,
    TweetWithUserModel,
} from '../../domain/models/tweet.model';
import { ITweetRepository } from '../../domain/repository/tweet.respository';
import { TweetSchema } from '../schemas/tweet.schema';
import { ITweetDoc, ITweetUser } from '../interfaces/tweet.interface';
import { CreatedAtVO } from '../../../shared/domain/value-objects/CreatedAtValueObject';
import { UuidVO } from '../../../shared/domain/value-objects/Uuid';
import { ContentVO } from '../../../shared/domain/value-objects/ContentValueObject';
import { IUserDoc } from '../../../user/infrastructure/interface/IUser';

@injectable()
export class TweetRepository implements ITweetRepository {
    /**
     * It takes a Mongoose document and returns a plain object
     * @param {IUserDoc} owner - IUserDoc - this is the owner of the domain.
     * @returns An object with the id, username, and avatar of the owner.
     */

    private todDomainOwnerData(owner: IUserDoc) {
        return {
            id: new UuidVO(owner._id),
            username: new UsernameVO(owner.username),
            avatar: '',
        };
    }

    /**
     * It takes a tweet from the database and converts it into a TweetModel
     * @param {ITweet} persistanceTweet - ITweet
     * @returns A TweetModel
     */
    private toDomainWithUser(persistanceTweet: ITweetUser): TweetWithUserModel {
        const { _id, content, likes, createdAt, ownerId, replysId } =
            persistanceTweet;
        const likesArrayVO = likes ? likes?.map(like => new UuidVO(like)) : [];
        const replysIdVO = replysId ? replysId.map(rp => new UuidVO(rp)) : [];
        const ownerData = this.todDomainOwnerData(ownerId);

        return new TweetWithUserModel(
            new UuidVO(_id),
            new ContentVO(content),
            null, //image
            replysIdVO,
            likesArrayVO,
            new CreatedAtVO(createdAt),
            ownerData
        );
    }

    private toDomain(persistanceTweet: ITweetDoc): TweetModel {
        /* array replys Id VO */
        const likesArrayVO = persistanceTweet.likes?.map(
            (like: string) => new UuidVO(like)
        );

        /* array replys Id VO */
        const ReplyArrayVO = persistanceTweet.replysId?.map(
            (reply: string) => new UuidVO(reply)
        );

        return new TweetModel(
            new UuidVO(persistanceTweet._id),
            new ContentVO(persistanceTweet.content),
            new UuidVO(persistanceTweet.ownerId),
            null, //image
            ReplyArrayVO || [],
            likesArrayVO || [],
            new CreatedAtVO(persistanceTweet.createdAt)
        );
    }
    /**
     * It takes a TweetModel and returns a TweetPersistance
     * @param {TweetModel} domainTweet - TweetModel - this is the domain model that we want to convert to a
     * persistance model.
     * @returns A TweetModel object
     */

    private toPersistance(domainTweet: TweetModel) {
        const { id, content, ownerId, likes, createdAt } = domainTweet;
        const likesValues = likes ? likes.map(like => like.value) : [];
        return {
            _id: id.value,
            content: content.value,
            ownerId: ownerId.value,
            likes: likesValues,
            createdAt: createdAt.value,
        };
    }

    async create(tweet: TweetModel): Promise<TweetModel | null> {
        const tweetPersistance = this.toPersistance(tweet);
        const newTweet = new TweetSchema(tweetPersistance);
        return this.toDomain(await newTweet.save());
    }

    async findById(id: UuidVO): Promise<TweetModel | null> {
        //todo- the tweet should get 10 first replys
        const tweetFound = await TweetSchema.findById(id.value);
        if (!tweetFound) return null;
        return this.toDomain(tweetFound);
    }

    async findByIdWithOwner(id: UuidVO): Promise<TweetWithUserModel | null> {
        const tweetFound = await TweetSchema.findById(id.value).populate<{
            ownerId: IUserDoc;
        }>('ownerId');
        if (!tweetFound) return null;
        return this.toDomainWithUser(tweetFound);
    }

    async delete(id: UuidVO): Promise<TweetModel | null> {
        const tweetDelete = await TweetSchema.findByIdAndDelete(id.value);
        if (!tweetDelete) return null;
        return this.toDomain(tweetDelete);
    }

    async update(id: UuidVO, tweet: TweetModel): Promise<TweetModel | null> {
        const tweetPersistance = this.toPersistance(tweet);
        const { _id, ...rest } = tweetPersistance;

        const tweetUpdate = TweetSchema.findByIdAndUpdate(_id, rest);
        return this.toDomain(tweetPersistance);
    }

    async findByOwnerId(onwerId: UuidVO): Promise<TweetWithUserModel[] | null> {
        const tweets = await TweetSchema.find({
            ownerId: onwerId.value,
        }).populate<{ ownerId: IUserDoc }>([
            {
                path: 'ownerId',
                select: ['username', 'avatar'],
            },
        ]);
        if (!tweets) return null;
        return tweets.map(tweet => this.toDomainWithUser(tweet));
    }

    async findAll(): Promise<TweetWithUserModel[] | null> {
        //const tweets = await TweetSchema.find().skip(1).limit(10);
        const tweets = await TweetSchema.find().populate<{ ownerId: IUserDoc }>(
            {
                path: 'ownerId',
                select: ['username', 'avatar'],
            }
        );
        if (!tweets) return null;
        return tweets.map(tweet => this.toDomainWithUser(tweet));
    }

    async addLike(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | null> {
        const tweet = await TweetSchema.findById(tweetId.value);
        if (!tweet) return null;

        if (!tweet?.likes?.includes(userId.value))
            tweet?.likes?.push(userId.value);
        return this.toDomain(await tweet.save()!);
    }

    async removeLike(
        tweetId: UuidVO,
        userId: UuidVO
    ): Promise<TweetModel | null> {
        const tweet = await TweetSchema.findById(tweetId.value);
        if (!tweet) return null;

        if (tweet?.likes?.includes(userId.value))
            tweet.likes = tweet.likes.filter(like => like !== userId.value);
        return this.toDomain(await tweet.save()!);
    }
}
