import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel, TweetWithUserModel } from '../models/tweet.model';

export interface ITweetRepository {
    /**
     * It finds a user by id.
     * @param {TweetModel}tweet -tweetModel
     * @returns A {TweeModel}
     */
    create(tweet: TweetModel): Promise<TweetModel | null>;

    /* Deleting a tweet by id. */
    delete(id: UuidVO): Promise<TweetModel | null>;

    update(id: UuidVO, tweet: TweetModel): Promise<TweetModel | null>;

    findById(id: UuidVO): Promise<TweetModel | null>;

    findByIdWithOwner(id: UuidVO): Promise<TweetWithUserModel | null>;

    findAll(): Promise<TweetWithUserModel[] | null>;

    findByOwnerId(onwerId: UuidVO): Promise<TweetWithUserModel[] | null>;

    like(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | null>;
}
