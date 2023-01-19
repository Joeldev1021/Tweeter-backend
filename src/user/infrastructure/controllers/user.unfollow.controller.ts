import { inject } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { controller, httpPost } from 'inversify-express-utils';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { NextFunction, Response } from 'express';
import { UserUnfollowUseCase } from '../../application/usecases/user.unfollow.usecase';

@controller('/user')
export class UserUnfollowController {
    private _userUnfollowUseCase: UserUnfollowUseCase;
    constructor(
        @inject(TYPES.UserUnfollowUseCase)
        userUnfollowUseCase: UserUnfollowUseCase
    ) {
        this._userUnfollowUseCase = userUnfollowUseCase;
    }

    @httpPost('/unfollow/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const unfollowId = req.params.id;
        const userId = req.userId;
        try {
            const tweetFound = await this._userUnfollowUseCase.execute(
                new UuidVO(userId),
                new UuidVO(unfollowId)
            );
            res.status(200).send(tweetFound);
        } catch (error) {
            next(error);
        }
    }
}
