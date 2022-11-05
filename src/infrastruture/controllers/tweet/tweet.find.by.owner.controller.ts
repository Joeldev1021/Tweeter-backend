import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpGet } from "inversify-express-utils"
import { TweetFindByOwnerIdUseCase } from "../../../application/use-cases/tweet/tweet.find.by.id.owner"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweet')
export class TweetFindByIdController {
    constructor(
        @inject(TYPES.TweetFindByOwnerIdUseCase)
        private TweetFindByOwnerIdUseCase: TweetFindByOwnerIdUseCase
    ) {
    }
    @httpGet('/owner', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {

        try {

            const tweetFound = await this.TweetFindByOwnerIdUseCase.execute(new UuidVO(req.userId))

            res.status(200).send(tweetFound)
        } catch (error) {
            next(error)
        }

    }
}