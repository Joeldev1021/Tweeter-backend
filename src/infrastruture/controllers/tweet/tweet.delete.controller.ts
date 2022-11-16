import { NextFunction, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete } from "inversify-express-utils"
import { TweetDeleteByIdUseCase } from "../../../application/use-cases/tweet/tweet.delete.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweet')
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
            const tweetDelete = await this.tweetDeleteByIdUseCase.execute(
                new UuidVO(id),
                new UuidVO(req.userId)
            )
            res.status(201).send()
        } catch (error) {
            next(error)
        }

    }
}