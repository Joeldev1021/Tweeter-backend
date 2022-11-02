import { NextFunction, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete } from "inversify-express-utils"
import { TweetUpdateByIdUseCase } from "../../../application/use-cases/tweet/tweet.update.usecase"
import { TweetVO } from "../../../domain/value-objects/tweet/tweet.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweeter')
export class TweetDeleteByIdController {
    constructor(
        @inject(TYPES.TweetUpdateByIdUseCase)
        private tweetUpdateByIdUseCase: TweetUpdateByIdUseCase
    ) {
    }
    @httpDelete('/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const id = req.params.id

        try {
            const tweetFound = await this.tweetUpdateByIdUseCase.execute(
                new UuidVO(id),
                new TweetVO(req.body.tweet),
                new UuidVO(req.userId))
            res.status(200).send(tweetFound)
        } catch (error) {
            next(error)
        }

    }
}