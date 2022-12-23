import { inject } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { controller, httpPost } from 'inversify-express-utils';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { NextFunction, Response } from 'express';
import { UserFollowerUseCase } from '../../application/usecases/user.follower.usecase';
import { UserFollowingUseCase } from '../../application/usecases/user.following.usecase';

@controller('/user/')
export class UserFollowingController {
    private _userFollowingUseCase: UserFollowingUseCase;
    constructor(
        @inject(TYPES.UserFollowingUseCase)
        userFollowingUseCase: UserFollowingUseCase
    ) {
        this._userFollowingUseCase = userFollowingUseCase;
    }

    @httpPost('/following/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const followingId = req.params.id;
        const userId = req.userId;
        try {
            const tweetFound = await this._userFollowingUseCase.execute(
                new UuidVO(userId),
                new UuidVO(followingId)
            );
            res.status(200).send(tweetFound);
        } catch (error) {
            next(error);
        }
    }
}
