import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { ReplyFindByOwnerIdUseCase } from '../../application/usecases/reply.find.by.owner.usecase';
import { ReplyFindByTweetIdUseCase } from '../../application/usecases/reply.find.by.tweet.usecase';

@controller('/reply')
export class ReplyFindByTweetIdController {
    constructor(
        @inject(TYPES.ReplyFindByTweetIdUseCase)
        private replyFindByTweetIdUseCase: ReplyFindByTweetIdUseCase
    ) {}
    @httpGet('/tweet/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        try {
            const replys = await this.replyFindByTweetIdUseCase.execute(
                new UuidVO(id)
            );

            res.status(200).send(replys);
        } catch (error) {
            next(error);
        }
    }
}
