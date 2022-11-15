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
        const { _id, content, tweetId, ownerId } = persistanceReply
        return new ReplyModel(
            new UuidVO(_id),
            new ContentVO(content),
            new UuidVO(tweetId),
            new UuidVO(ownerId),
        )
    }

    /**
     * It takes a domain object and returns a persistance object
     * @param {ReplyModel} domainReply - ReplyModel - this is the domain object that we want to convert
     * to a persistance object.
     * @returns a new object with the same properties as the domainReply object.
     */
    private toPersistance(domainReply: ReplyModel) {
        return {
            _id: domainReply.id.value,
            content: domainReply.content.value,
            tweetId: domainReply.tweetId.value,
            ownerId: domainReply.ownerId.value
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

    async findAll(): Promise<ReplyModel[] | undefined> {
        const replys = await ReplySchema.find();
        if (replys)
            return replys.map(reply => this.toDomain(reply))
    }

}

