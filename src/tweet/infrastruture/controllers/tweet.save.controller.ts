import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { UserRequest } from '../../../shared/infrastruture/types';
import { TYPES } from '../../../types';
import { TweetSaveUseCase } from '../../application/usecase/tweet.save.usecase';

@controller('/tweet')
export class TweetFindByIdController {
    constructor(
        @inject(TYPES.TweetSaveUseCase)
        private TweetSaveUseCase: TweetSaveUseCase
    ) {}
    @httpGet('/save/:id', TYPES.AuthMiddleware)
    async execute(
        req: UserRequest<{ userId: string }>,
        res: Response,
        next: NextFunction
    ) {
        const id = req.params.id;
        const userId = req.userId;
        try {
            const tweet = await this.TweetSaveUseCase.execute(new UuidVO(id));
            res.status(200).send(tweet);
        } catch (error) {
            next(error);
        }
    }
}
