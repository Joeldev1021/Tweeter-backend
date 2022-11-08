import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpGet } from "inversify-express-utils"
import { TweetLikeUseCase } from "../../../application/use-cases/tweet/tweet.like.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { AuthRequest } from "../../types"

@controller('/tweet')
export class TweetLikeController {
    constructor(
        @inject(TYPES.TweetLikeUseCase)
        private TweetLikeUseCase: TweetLikeUseCase
    ) {
    }
    @httpGet('/:id', TYPES.AuthMiddleware)
    async execute(req: AuthRequest<Request>, res: Response, next: NextFunction) {
        const TweetId = req.params.id

        try {

            const tweetFound = await this.TweetLikeUseCase.execute(new UuidVO(TweetId), new UuidVO(req.userId))

            res.status(200).send(tweetFound)
        } catch (error) {
            next(error)
        }

    }
}