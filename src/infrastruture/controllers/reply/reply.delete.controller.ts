import { NextFunction, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete } from "inversify-express-utils"
import { ReplyDeleteByIdUseCase } from "../../../application/use-cases/reply/reply.delete.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweeter/reply')
export class ReplyDeleteByIdController {
    constructor(
        @inject(TYPES.ReplyDeleteByIdUseCase)
        private replyDeleteByIdUseCase: ReplyDeleteByIdUseCase
    ) {
    }
    @httpDelete('/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const id = req.params.id

        try {
            const replyDelete = await this.replyDeleteByIdUseCase.execute(
                new UuidVO(id),
                new UuidVO(req.userId)
            )
            res.status(200).send(replyDelete)
        } catch (error) {
            next(error)
        }

    }
}