import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel, TweetWithUserModel } from '../models/tweet.model';

export interface ITweetRepository {
    /**
     * It finds a user by id.
     * @param {UuidVO} id - UuidVO
     * @returns A {TweeModel}
     */
    findById(id: UuidVO): Promise<TweetWithUserModel | null>;

    /**
     * It finds a user by id.
     * @param {TweetModel}tweet -tweetModel
     * @returns A {TweeModel}
     */
    create(tweet: TweetModel): Promise<TweetModel | null>;

    /* Deleting a tweet by id. */
    delete(id: UuidVO): Promise<TweetModel | null>;

    update(id: UuidVO, content: ContentVO): Promise<TweetModel | null>;

    findById(id: UuidVO): Promise<TweetWithUserModel | null>;

    findAll(): Promise<TweetWithUserModel[] | null>;

    findByOwnerId(onwerId: UuidVO): Promise<TweetWithUserModel[] | null>;

    like(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | null>;
}
