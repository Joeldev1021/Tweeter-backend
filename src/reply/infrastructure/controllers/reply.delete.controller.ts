import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetDtoType } from '../../../shared/infrastruture/dtos/tweet.dto';
import { TweetRequest } from '../../../shared/infrastruture/types';
import { TYPES } from '../../../types';
import { ReplyDeleteByIdUseCase } from '../../application/usecases/reply.delete.usecase';

@controller('/reply')
export class ReplyDeleteByIdController {
    constructor(
        @inject(TYPES.ReplyDeleteByIdUseCase)
        private replyDeleteByIdUseCase: ReplyDeleteByIdUseCase
    ) {}
    @httpDelete('/:id', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ) {
        const id = req.params.id;
        try {
            const replyDelete = await this.replyDeleteByIdUseCase.execute(
                new UuidVO(id),
                new UuidVO(req.userId)
            );
            res.status(201).send(replyDelete);
        } catch (error) {
            next(error);
        }
    }
}
