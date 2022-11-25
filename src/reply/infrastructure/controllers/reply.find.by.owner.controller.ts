import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetDtoType } from '../../../shared/infrastruture/dtos/tweet.dto';
import { TweetRequest } from '../../../shared/infrastruture/types';
import { TYPES } from '../../../types';
import { ReplyFindByOwnerIdUseCase } from '../../application/usecases/reply.find.by.owner.usecase';

@controller('/reply')
export class ReplyFindByOwnerIdController {
    constructor(
        @inject(TYPES.ReplyFindByOwnerIdUseCase)
        private replyFindByOwnerIdUseCase: ReplyFindByOwnerIdUseCase
    ) {}
    @httpGet('/owner', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const replyFound = await this.replyFindByOwnerIdUseCase.execute(
                new UuidVO(req.userId)
            );

            res.status(200).send(replyFound);
        } catch (error) {
            next(error);
        }
    }
}
