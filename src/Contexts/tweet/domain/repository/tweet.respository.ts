import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel, TweetWithUserModel } from '../models/tweet.model';

export interface ITweetRepository {
    /**
     * It takes a TweetModel, converts it to a TweetPersistance, and then converts that TweetPersistance
     * to a TweetModel
     * @param {TweetModel} tweet - TweetModel - this is the tweet object that we are going to create.
     * @returns A promise of a tweet model or null
     */
    create(tweet: TweetModel): Promise<TweetModel | null>;
    /**
     * It returns all the tweets in the database.
     * @returns An array of TweetModel objects.
     */
    findAll(): Promise<TweetWithUserModel[] | null>;

    /**
     * It deletes a tweet by id.
     * @param {UuidVO} id - UuidVO
     * @returns The tweet that was deleted.
     */
    delete(id: UuidVO): Promise<TweetModel | null>;
    /**
     * It updates a tweet by id.
     * @param {UuidVO} id - UuidVO - The id of the tweet to be updated
     * @param {TweetModel} tweet - TweetModel - The tweet object that will be updated.
     * @returns The tweetUpdate is being returned.
     */
    update(id: UuidVO, tweet: TweetModel): Promise<TweetModel | null>;
    /**
     * > It finds a tweet by its id and returns it as a domain model
     * @param {UuidVO} id - UuidVO - The id of the tweet we want to find.
     * @returns TweetModel |null
     */
    findById(id: UuidVO): Promise<TweetModel | null>;
    /**
     * "Find a tweet by its id, and populate the ownerId field with the user document."
     *
     * The `populate` function is a Mongoose function that allows you to populate a field with the document
     * that it references
     * @param {UuidVO} id - UuidVO
     * @returns TweetWithUserModel | null
     */
    findByIdWithOwner(id: UuidVO): Promise<TweetWithUserModel | null>;
    /**
     * It returns a list of tweets that belong to a user
     * @param {UuidVO} onwerId - UuidVO
     * @returns A list of tweets
     */
    findByOwnerId(onwerId: UuidVO): Promise<TweetWithUserModel[] | null>;

    /**
     * It finds a tweet by id, checks if the user has already liked it, if so, it removes the like,
     * if not, it adds the like
     * @param {UuidVO} tweetId - UuidVO - The tweet's id
     * @param {UuidVO} userId - UuidVO
     * @returns A tweet model
     */

    addLike(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | null>;
    removeLike(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | null>;
}
