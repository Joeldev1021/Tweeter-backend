import { ReplyModel } from "../models/reply.model";
import { UuidVO } from "../value-objects/uuid.vo";

export interface IReplyRepository {

    /**
    * It finds a user by id.
    * @param {UuidVO} id - UuidVO
    * @returns A {TweeModel}
    */
    findById(id: UuidVO): Promise<ReplyModel | undefined>

    /**
    * It finds a user by id.
    * @param {ReplyModel}tweet -ReplyModel 
    * @returns A {TweeModel}
    */
    create(tweet: ReplyModel): Promise<ReplyModel | undefined>

    /* Deleting a tweet by id. */
    delete(id: UuidVO): Promise<ReplyModel | undefined>

    findAll(): Promise<ReplyModel[] | undefined>

    findByOwnerId(onwerId: UuidVO): Promise<ReplyModel[] | undefined>

    findByTweetId(tweetId: UuidVO): Promise<ReplyModel[] | undefined>

    like(tweetId: UuidVO, userId: UuidVO): Promise<ReplyModel | undefined>



}