import { ContentVO } from "@domain/value-objects/tweet/content.vo";
import { TweetModel } from "../models/tweet.model";
import { UuidVO } from "../value-objects/uuid.vo";

export interface ITweetRepository {

    /**
    * It finds a user by id.
    * @param {UuidVO} id - UuidVO
    * @returns A {TweeModel}
    */
    findById(id: UuidVO): Promise<TweetModel | undefined>


    /**
    * It finds a user by id.
    * @param {TweetModel}tweet -tweetModel 
    * @returns A {TweeModel}
    */
    create(tweet: TweetModel): Promise<TweetModel | undefined>

    /* Deleting a tweet by id. */
    delete(id: UuidVO): Promise<TweetModel | undefined>

    update(id: UuidVO, content: ContentVO): Promise<TweetModel | undefined>

    findAll(): Promise<TweetModel[] | undefined>

    findByOwnerId(onwerId: UuidVO): Promise<TweetModel[] | undefined>

    like(tweetId: UuidVO, userId: UuidVO): Promise<TweetModel | undefined>

    findAllReply(tweetId: UuidVO): Promise<TweetModel | undefined>
}