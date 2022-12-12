import { injectable } from 'inversify';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { IOwnerDataVO } from '../../../shared/infrastruture/types';
import { UsernameVO } from '../../../user/domain/value-objects/username.vo';
import { IUserDoc } from '../../../user/infrastructure/interface/user.interface';
import { ReplyModel, ReplyWithUserModel } from '../../domain/model/reply.model';
import { IReplyRepository } from '../../domain/repository/reply.repository';
import { IReplyDoc, IReplyUser } from '../interface/reply.interface';
import { ReplySchema } from '../schema/reply.schema';

@injectable()
export class ReplyRepository implements IReplyRepository {
    /**
     * It takes a reply from the database and converts it into a reply that can be used by the
     * application
     * @param {IReply} persistanceReply - IReply
     * @returns A ReplyModel
     */
    private toDomain(persistanceReply: IReplyDoc): ReplyModel {
        const { _id, content, tweetId, ownerId, likes, createdAt } =
            persistanceReply;
        const arrayLikesVO = likes ? likes.map(like => new UuidVO(like)) : [];

        return new ReplyModel(
            new UuidVO(_id),
            new ContentVO(content),
            new UuidVO(tweetId),
            new UuidVO(ownerId),
            null, //parent => reply
            arrayLikesVO,
            [],
            //todo -> missing replys
            new CreatedAtVO(createdAt)
        );
    }

    /**
     * It takes a Mongoose document and returns a value object
     * @param {IUserDoc} ownerData - IUserDoc - this is the data that we're going to convert.
     * @returns An object with the following properties:
     * - id: a UuidVO
     * - username: a UsernameVO
     * - avatar: a string
     */
    private toDomainOwnerData(ownerData: IUserDoc): IOwnerDataVO {
        return {
            id: new UuidVO(ownerData._id),
            username: new UsernameVO(ownerData.username),
            avatar: '',
        };
    }

    /**
     * It converts a reply with user data to a reply with user data
     * @param {IReplyUser} reply - IReplyUser
     * @returns A ReplyWithUserModel
     */

    private toDomainWithUser(reply: IReplyUser): ReplyWithUserModel {
        const arrayLikesVO = reply.likes?.map(like => new UuidVO(like));

        const ownerData = this.toDomainOwnerData(reply.ownerId);

        return new ReplyWithUserModel(
            new UuidVO(reply._id),
            new ContentVO(reply.content),
            new UuidVO(reply.tweetId),
            arrayLikesVO!,
            ownerData,
            new CreatedAtVO(reply.createdAt)
        );
    }

    /**
     * It takes a domain object and returns a persistance object
     * @param {ReplyModel} domainReply - ReplyModel - this is the domain object that we want to convert
     * to a persistance object.
     * @returns a new object with the same properties as the domainReply object.
     */
    private toPersistance(domainReply: ReplyModel): IReplyDoc {
        const {
            id,
            content,
            tweetId,
            ownerId,
            likes,
            createdAt,
            parentReply,
            replyIds,
        } = domainReply;
        const likesValues = likes ? likes.map(like => like.value) : [];
        const replys = replyIds ? replyIds.map(reply => reply.value) : [];
        return {
            _id: id.value,
            content: content.value,
            tweetId: tweetId.value,
            ownerId: ownerId.value,
            parentReplyId: parentReply?.value,
            replyIds: replys,
            likes: likesValues,
            createdAt: createdAt.value,
        };
    }
    /**
     * It takes a reply, converts it to a replyPersistance, creates a new replySchema, and then converts it
     * back to a reply
     * @param {ReplyModel} reply - ReplyModel - this is the reply object that we want to save to the
     * database.
     * @returns The new reply that was created.
     */

    async create(reply: ReplyModel): Promise<ReplyModel | null> {
        const replyPersistance = this.toPersistance(reply);
        const newReply = new ReplySchema(replyPersistance);

        return this.toDomain(await newReply.save());
    }

    /**
     * > It finds a reply by its id and returns it as a domain model
     * @param {UuidVO} id - UuidVO - The id of the reply we want to find.
     * @returns  ReplyModel |null
     */

    async findById(id: UuidVO): Promise<ReplyModel | null> {
        const replyFound = await ReplySchema.findById(id.value);
        if (!replyFound) return null;
        return this.toDomain(replyFound);
    }

    /**
     * It deletes a reply by id.
     * @param {UuidVO} id - UuidVO
     * @returns The reply that was deleted.
     */
    async delete(id: UuidVO): Promise<ReplyModel | null> {
        const replyDelete = await ReplySchema.findByIdAndDelete(id.value);
        if (!replyDelete) return null;
        return this.toDomain(replyDelete);
    }

    /**
     * It finds all the replys that have the same ownerId as the one passed in.
     * @param {UuidVO} onwerId - UuidVO
     * @returns ReplyModel[] |null
     */

    async findByOwnerId(onwerId: UuidVO): Promise<ReplyModel[]> {
        const replys = await ReplySchema.find({ onwerId: onwerId });
        return replys.map(reply => this.toDomain(reply));
    }
    /**
     * It returns a list of all the replys in the database
     * @returns ReplyModel[] |null
     */
    async findByTweetId(tweetId: UuidVO): Promise<ReplyWithUserModel[] | null> {
        const replys = await ReplySchema.find({
            tweetId: tweetId.value,
        }).populate<{ ownerId: IUserDoc }>('ownerId');

        if (!replys) return null;
        return replys.map(reply => this.toDomainWithUser(reply));
    }

    /**
     * It finds all the replys that have the same parentReplyId as the one passed in, and then populates
     * the ownerId field with the user data
     * @param {UuidVO} parentReplyId - UuidVO
     * @returns An array of ReplyWithUserModel objects.
     */
    async findByParentReplyId(
        parentReplyId: UuidVO
    ): Promise<ReplyWithUserModel[] | null> {
        const replysFound = await ReplySchema.find({
            parentReplyId: parentReplyId.value,
        }).populate<{ ownerId: IUserDoc }>('ownerId');

        if (!replysFound) return null;

        return replysFound.map(reply => this.toDomainWithUser(reply));
    }

    async findAll(): Promise<ReplyModel[] | null> {
        const replys = await ReplySchema.find();
        if (!replys) return null;
        return replys.map(reply => this.toDomain(reply));
    }

    /**
     * It finds a tweet by id, checks if the user has already liked it, if so, it removes the like,
     * if not, it adds the like
     * @param {UuidVO} replyId - UuidVO - The tweet's id
     * @param {UuidVO} userId - UuidVO
     * @returns A tweet model
     */
    async like(replyId: UuidVO, userId: UuidVO): Promise<ReplyModel | null> {
        const reply = await ReplySchema.findById(replyId.value);
        if (!reply) return null;

        if (reply?.likes?.includes(userId.value)) {
            reply.likes = reply.likes.filter(like => like !== userId.value);
        } else {
            reply?.likes?.push(userId.value);
        }
        return this.toDomain(await reply.save()!);
    }
}
