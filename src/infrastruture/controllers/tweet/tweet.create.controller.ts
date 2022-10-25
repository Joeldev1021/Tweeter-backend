import { NextFunction, Response } from "express"
import { controller, httpPost } from "inversify-express-utils"
import { TweetRequest } from "../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { UnnecesayFieldsExceptions } from "../../errors/unnecesay.fields.exception"
import { inject } from "inversify"
import { TYPES } from "../../../types"
import { TweetCreateUseCase } from "../../../application/use-cases/tweet/create-tweet.usecase"

@controller('/tweeter')
export class TweetCreateController {
    constructor(
        @inject(TYPES.TweetCreateUseCase)
        private tweetCreateUseCase: TweetCreateUseCase
    ) {
    }
    @httpPost('/create')
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const { _id, tweet, ...rest } = req.body
        try {
            if (Object.keys(rest).length > 0) throw new UnnecesayFieldsExceptions()

            const tweetCreated = await this.tweetCreateUseCase.execute(_id, tweet)

            res.status(201).send(tweetCreated)
        } catch (error) {
            next(error)
        }

    }
}