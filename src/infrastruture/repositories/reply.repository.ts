import { CreatedAtVO } from "@domain/value-objects/created-at.vo"
import { injectable } from "inversify"
import { ReplyModel } from "../../domain/models/reply.model"
import { IReplyRepository } from "../../domain/repository/reply.repository"
import { ContentVO } from "../../domain/value-objects/tweet/content.vo"
import { UuidVO } from "../../domain/value-objects/uuid.vo"
import { ReplySchema } from "../schemas/reply.schema"
import { IReply } from "../types/schemas/reply.interface"

@injectable()
export class ReplyRepository implements IReplyRepository {


    /**
     * It takes a reply from the database and converts it into a reply that can be used by the
     * application
     * @param {IReply} persistanceReply - IReply
     * @returns A ReplyModel
     */
    private toDomain(persistanceReply: IReply): ReplyModel {
        const { _id, content, tweetId, ownerId, likes, createdAt } = persistanceReply
        const arrayVO = likes ? likes.map(like => new UuidVO(like)) : []
        return new ReplyModel(
            new UuidVO(_id),
            new ContentVO(content),
            new UuidVO(tweetId),
            new UuidVO(ownerId),
            arrayVO,
            //todo -> missing replys
            new CreatedAtVO(createdAt)
        )
    }

    /**
     * It takes a domain object and returns a persistance object
     * @param {ReplyModel} domainReply - ReplyModel - this is the domain object that we want to convert
     * to a persistance object.
     * @returns a new object with the same properties as the domainReply object.
     */
    private toPersistance(domainReply: ReplyModel) {
        const { id, content, tweetId, ownerId, likes, createdAt } = domainReply
        const likesValues = likes ? likes.map(like => like.value) : []
        return {
            _id: id.value,
            content: content.value,
            tweetId: tweetId.value,
            ownerId: ownerId.value,
            likes: likesValues,
            createdAt: createdAt.value
        }
    }
    /**
     * It takes a reply, converts it to a replyPersistance, creates a new replySchema, and then converts it
     * back to a reply
     * @param {ReplyModel} reply - ReplyModel - this is the reply object that we want to save to the
     * database.
     * @returns The new reply that was created.
     */

    async create(reply: ReplyModel): Promise<ReplyModel | undefined> {
        const replyPersistance = this.toPersistance(reply)
        const newReply = new ReplySchema(replyPersistance)
        return this.toDomain(await newReply.save())
    }

    /**
     * > It finds a reply by its id and returns it as a domain model
     * @param {UuidVO} id - UuidVO - The id of the reply we want to find.
     * @returns  ReplyModel | undefined
     */

    async findById(id: UuidVO): Promise<ReplyModel | undefined> {
        const replyFound = await ReplySchema.findById(id.value)
        if (replyFound)
            return this.toDomain(replyFound)
    }

    /**
     * It deletes a reply by id.
     * @param {UuidVO} id - UuidVO
     * @returns The reply that was deleted.
     */
    async delete(id: UuidVO): Promise<ReplyModel | undefined> {
        const replyDelete = await ReplySchema.findByIdAndDelete(id.value)
        if (replyDelete)
            return this.toDomain(replyDelete)
    }


    /**
     * It finds all the replys that have the same ownerId as the one passed in.
     * @param {UuidVO} onwerId - UuidVO
     * @returns ReplyModel[] | undefined
     */

    async findByOwnerId(onwerId: UuidVO): Promise<ReplyModel[] | undefined> {
        const replys = await ReplySchema.find({ onwerId: onwerId })
        if (replys)
            return replys.map(reply => this.toDomain(reply))
    }
    /**
     * It returns a list of all the replys in the database
     * @returns ReplyModel[] | undefined
     */
    async findByTweetId(tweetId: UuidVO): Promise<ReplyModel[] | undefined> {
        //todo populate with user
        const replys = await ReplySchema.find({ tweetId: tweetId.value }).populate({
            path: "ownerId",
            select: ['username', 'avatar', 'createAt']
        })

        if (replys)
            return replys.map(reply => this.toDomain(reply))
    }

    async findAll(): Promise<ReplyModel[] | undefined> {
        const replys = await ReplySchema.find();
        if (replys)
            return replys.map(reply => this.toDomain(reply))
    }

    /**
     * It finds a tweet by id, checks if the user has already liked it, if so, it removes the like,
     * if not, it adds the like
     * @param {UuidVO} replyId - UuidVO - The tweet's id
     * @param {UuidVO} userId - UuidVO
     * @returns A tweet model
     */
    async like(replyId: UuidVO, userId: UuidVO): Promise<ReplyModel | undefined> {
        const reply = await ReplySchema.findById(replyId.value)
        if (reply) {
            if (reply?.likes?.includes(userId.value)) {
                reply.likes = reply.likes.filter(like => like !== userId.value)
            } else {
                reply?.likes?.push(userId.value)
            }
            return this.toDomain(await reply.save()!)
        }
    }

}

