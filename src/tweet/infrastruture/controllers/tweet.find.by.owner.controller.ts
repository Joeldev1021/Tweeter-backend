import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { TweetDtoType } from '../../../shared/infrastruture/dtos/tweet.dto';
import { TweetRequest } from '../../../shared/infrastruture/types';
import { TweetFindByOwnerIdUseCase } from '../../application/usecase/tweet.find.by.id.owner.usecase';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

@controller('/tweet')
export class TweetFindByOwnerIdController {
    constructor(
        @inject(TYPES.TweetFindByOwnerIdUseCase)
        private TweetFindByOwnerIdUseCase: TweetFindByOwnerIdUseCase
    ) {}
    @httpGet('/owner', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const tweetFound = await this.TweetFindByOwnerIdUseCase.execute(
                new UuidVO(req.userId)
            );

            res.status(200).send(tweetFound);
        } catch (error) {
            next(error);
        }
    }
}
