import { NextFunction, Response } from "express"
import { controller, httpPost } from "inversify-express-utils"
import { TweetRequest } from "../../types"
import { UnnecesayFieldsExceptions } from "../../errors/unnecesay.fields.exception"
import { inject } from "inversify"
import { TYPES } from "../../../types"
import { TweetCreateUseCase } from "../../../application/use-cases/tweet/tweet-create.usecase"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TweetVO } from "../../../domain/value-objects/tweet/tweet.vo"

@controller('/tweet')
export class TweetCreateController {
    constructor(
        @inject(TYPES.TweetCreateUseCase)
        private tweetCreateUseCase: TweetCreateUseCase
    ) {
    }
    @httpPost('/', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const { id, tweet, ...rest } = req.body
        try {
            if (Object.keys(rest).length > 0) throw new UnnecesayFieldsExceptions()

            const tweetCreated = await this.tweetCreateUseCase.execute(
                new UuidVO(id),
                new TweetVO(tweet),
                new UuidVO(req.userId)
            )

            res.status(201).send(tweetCreated)
        } catch (error) {
            next(error)
        }

    }
}