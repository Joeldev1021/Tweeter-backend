import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { ReplyModel, ReplyWithUserModel } from '../model/reply.model';

export interface IReplyRepository {
    /**
     * It finds a user by id.
     * @param {UuidVO} id - UuidVO
     * @returns A {TweeModel}
     */
    findById(id: UuidVO): Promise<ReplyModel | null>;

    /**
     * It finds a user by id.
     * @param {ReplyModel}tweet -ReplyModel
     * @returns A {TweeModel}
     */
    create(tweet: ReplyModel): Promise<ReplyModel | null>;

    /* Deleting a tweet by id. */
    delete(id: UuidVO): Promise<ReplyModel | null>;

    findAll(): Promise<ReplyModel[] | null>;

    findByOwnerId(onwerId: UuidVO): Promise<ReplyModel[]>;

    findByTweetId(tweetId: UuidVO): Promise<ReplyWithUserModel[] | null>;

    like(tweetId: UuidVO, userId: UuidVO): Promise<ReplyModel | null>;
}
