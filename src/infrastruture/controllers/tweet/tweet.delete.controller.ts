import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete } from "inversify-express-utils"
import { TweetDeleteByIdUseCase } from "../../../application/use-cases/tweet/tweet.delete.usecase"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweeter')
export class TweetDeleteByIdController {
    constructor(
        @inject(TYPES.TweetDeleteByIdUseCase)
        private tweetDeleteByIdUseCase: TweetDeleteByIdUseCase
    ) {
    }
    @httpDelete('/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const id = req.params.id

        try {
            const tweetFound = await this.tweetDeleteByIdUseCase.execute(id, req.body.tweet, req.userId)

            res.status(200).send(tweetFound)
        } catch (error) {
            next(error)
        }

    }
}