import { NextFunction, Response } from "express"
import { controller, httpPost } from "inversify-express-utils"
import { TweetRequest } from "../../types"
import { UnnecesayFieldsExceptions } from "../../errors/unnecesay.fields.exception"
import { inject } from "inversify"
import { TYPES } from "../../../types"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { ReplyDtoType } from "../../dtos/reply.dto"
import { ContentVO } from "../../../domain/value-objects/tweet/content.vo"
import { ReplyCreateUseCase } from "../../../application/use-cases/reply/reply.create.usecase"
import { CreatedAtVO } from "@domain/value-objects/created-at.vo"

@controller('/reply')
export class ReplyCreateController {
    constructor(
        @inject(TYPES.ReplyCreateUseCase)
        private replyCreateUseCase: ReplyCreateUseCase
    ) {
    }
    @httpPost('/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<ReplyDtoType>, res: Response, next: NextFunction) {
        const tweetId = req.params.id
        const { id, content, ...rest } = req.body
        try {
            if (Object.keys(rest).length > 0) throw new UnnecesayFieldsExceptions()

            const replyCreated = await this.replyCreateUseCase.execute(
                new UuidVO(id),
                new ContentVO(content),
                new UuidVO(tweetId),
                new UuidVO(req.userId)
            )

            res.status(201).send(replyCreated)
        } catch (error) {
            next(error)
        }

    }
}