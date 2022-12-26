import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { TYPES } from '../../../types';

@controller('/tweet')
export class UserSaveTweetController {
    constructor(
        @inject(TYPES.TweetFindByIdUseCase)
        private _userSaveTweetUseCase: UserSaveTweetUseCase
    ) {}
    @httpPost('/save/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const id = req.params.id;
        try {
            const tweet = await this._userSaveTweetUseCase.execute(
                new UuidVO(id)
            );
            res.status(200).send(tweet);
        } catch (error) {
            next(error);
        }
    }
}
