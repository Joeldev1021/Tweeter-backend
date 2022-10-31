import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpGet } from "inversify-express-utils"
import { TweetFindByIdUseCase } from "../../../application/use-cases/tweet/tweet.find.by.id.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"

@controller('/tweeter')
export class TweetFindByIdController {
    constructor(
        @inject(TYPES.TweetFindByIdUseCase)
        private TweetFindByIdUseCase: TweetFindByIdUseCase
    ) {
    }
    @httpGet('/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        try {

            const tweetFound = await this.TweetFindByIdUseCase.execute(new UuidVO(id))

            res.status(200).send(tweetFound)
        } catch (error) {
            next(error)
        }

    }
}