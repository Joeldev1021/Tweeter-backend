import { NextFunction, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { TweetRequest } from '../../../shared/infrastruture/types';
import { inject } from 'inversify';
import { TYPES } from '../../../types';
import { ReplyCreateUseCase } from '../../application/usecases/reply.create.usecase';
import { TweetDtoType } from '../../../shared/infrastruture/dtos/tweet.dto';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';

@controller('/reply')
export class ReplyCreateController {
    constructor(
        @inject(TYPES.ReplyCreateUseCase)
        private replyCreateUseCase: ReplyCreateUseCase
    ) {}
    @httpPost('/:id', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ) {
        const tweetId = req.params.id;
        const { id, content } = req.body;
        try {
            const replyCreated = await this.replyCreateUseCase.execute(
                new UuidVO(id),
                new ContentVO(content),
                new UuidVO(tweetId),
                new UuidVO(req.userId)
            );

            res.status(201).send(replyCreated);
        } catch (error) {
            next(error);
        }
    }
}
