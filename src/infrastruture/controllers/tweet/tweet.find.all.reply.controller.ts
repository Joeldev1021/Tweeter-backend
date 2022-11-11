import { NextFunction, Request, Response } from "express"
import { controller, httpGet } from "inversify-express-utils"
import { ReplyFindByIdUseCase } from "../../../application/use-cases/reply/reply.find.by.id.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { inject } from "inversify"
import { TweetFindAllReplyUseCase } from "../../../application/use-cases/tweet/tweet.find.all.reply.usecase"

@controller('/tweet')
export class TweetFindAllReplyController {
    constructor(
        @inject(TYPES.TweetFindAllReplyUseCase)
        private tweetFindAllReplyUseCase: TweetFindAllReplyUseCase
    ) {
    }
    @httpGet('/reply-all/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        try {

            const tweetReplys = await this.tweetFindAllReplyUseCase.execute(new UuidVO(id))

            res.status(200).send(tweetReplys)
        } catch (error) {
            next(error)
        }

    }
}