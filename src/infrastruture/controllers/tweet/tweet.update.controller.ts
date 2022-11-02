import { NextFunction, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpPut } from "inversify-express-utils"
import { TweetUpdateByIdUseCase } from "../../../application/use-cases/tweet/tweet.update.usecase"
import { TweetVO } from "../../../domain/value-objects/tweet/tweet.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweeter')
export class TweetUpdateByIdController {
    constructor(
        @inject(TYPES.TweetUpdateByIdUseCase)
        private tweetUpdateByIdUseCase: TweetUpdateByIdUseCase
    ) {
    }
    @httpPut('/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const { tweet, id } = req.body
        try {
            const tweetFound = await this.tweetUpdateByIdUseCase.execute(new UuidVO(id), new TweetVO(tweet), new UuidVO(req.userId))
            res.status(200).send(tweetFound)
        } catch (error) {
            next(error)
        }
    }
}