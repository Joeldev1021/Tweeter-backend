import { NextFunction, Response } from "express"
import { controller, httpPost } from "inversify-express-utils"
import { TweetRequest } from "../../types"
import { UnnecesayFieldsExceptions } from "../../errors/unnecesay.fields.exception"
import { inject } from "inversify"
import { TYPES } from "../../../types"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { ReplyDtoType } from "../../dtos/reply.dto"
import { ReplyVO } from "../../../domain/value-objects/tweet/reply.vo"
import { ReplyCreateUseCase } from "../../../application/use-cases/reply/reply.create.usecase"

@controller('/tweet')
export class ReplyCreateController {
    constructor(
        @inject(TYPES.TweetCreateUseCase)
        private replyCreateUseCase: ReplyCreateUseCase
    ) {
    }
    @httpPost('/reply/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<ReplyDtoType>, res: Response, next: NextFunction) {
        const tweetId = req.params.id
        const { id, reply, ...rest } = req.body
        try {
            if (Object.keys(rest).length > 0) throw new UnnecesayFieldsExceptions()

            const replyCreated = await this.replyCreateUseCase.execute(
                new UuidVO(id),
                new UuidVO(tweetId),
                new ReplyVO(reply),
                new UuidVO(req.userId)
            )

            res.status(201).send(replyCreated)
        } catch (error) {
            next(error)
        }

    }
}