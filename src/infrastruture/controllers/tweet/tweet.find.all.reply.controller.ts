import { NextFunction, Request, Response } from "express"
import { controller, httpGet } from "inversify-express-utils"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { inject } from "inversify"
import { TweetFindByIdUseCase } from "../../../application/use-cases/tweet/tweet.find.by.id.usecase"
import { ReplyFindByTweetIdUseCase } from "../../../application/use-cases/reply/reply.find.by.tweet.usecase"
@controller('/tweet')
export class TweetFindAllReplyController {
    constructor(
        @inject(TYPES.TweetFindByIdUseCase)
        @inject(TYPES.ReplyFindByTweetIdUseCase)
        private tweetFindByIdUseCase: TweetFindByIdUseCase,
        private replyFindByTweetIdUseCase: ReplyFindByTweetIdUseCase
    ) {
    }
    @httpGet('/reply-all/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const tweetId = req.params.id
        try {

            const tweet = await this.tweetFindByIdUseCase.execute(new UuidVO(tweetId))
            const replys = await this.replyFindByTweetIdUseCase.execute(new UuidVO(tweetId))

            res.status(200).json({
                tweet,
                replys
            })

        } catch (error) {
            next(error)
        }

    }
}