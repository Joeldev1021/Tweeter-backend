import { NextFunction, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpPut } from "inversify-express-utils"
import { TweetUpdateByIdUseCase } from "../../../application/use-cases/tweet/tweet.update.usecase"
import { ContentVO } from "../../../domain/value-objects/tweet/content.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweet')
export class TweetUpdateByIdController {
    constructor(
        @inject(TYPES.TweetUpdateByIdUseCase)
        private tweetUpdateByIdUseCase: TweetUpdateByIdUseCase
    ) {
    }
    @httpPut('/:id', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        const { content, id } = req.body
        try {
            const tweetUpdate = await this.tweetUpdateByIdUseCase.execute(new UuidVO(id), new ContentVO(content), new UuidVO(req.userId))

            const tweet = {
                id: tweetUpdate?.id.value,
                content: tweetUpdate?.content.value,
                createAt: tweetUpdate?.createdAt.value,
                ownerId: tweetUpdate?.ownerId.value
            }
            res.status(200).send(tweet)
        } catch (error) {
            next(error)
        }
    }
}