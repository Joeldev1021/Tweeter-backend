import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpPost } from "inversify-express-utils"
import { ReplyLikeUseCase } from "../../../application/use-cases/reply/reply.like.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { AuthRequest } from "../../types"

@controller('/reply')
export class ReplyLikeController {
    constructor(
        @inject(TYPES.ReplyLikeUseCase)
        private replyLikeUseCase: ReplyLikeUseCase
    ) {
    }
    @httpPost('/like/:id', TYPES.AuthMiddleware)
    async execute(req: AuthRequest<Request>, res: Response, next: NextFunction) {
        const replyId = req.params.id
        try {

            const replyFound = await this.replyLikeUseCase.execute(new UuidVO(replyId), new UuidVO(req.userId))
            res.status(200).send()
        } catch (error) {
            next(error)
        }

    }
}