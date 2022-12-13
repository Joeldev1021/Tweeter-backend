import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { httpPost } from 'inversify-express-utils';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { NextFunction, Response } from 'express';
import { UserFollowerUseCase } from '../../application,/usecases/user.follower.usecase';

@injectable()
export class UserFollowerController {
    private _userFollowerUseCase: UserFollowerUseCase;
    constructor(
        @inject(TYPES.UserFollowerUseCase)
        userFollowerUseCase: UserFollowerUseCase
    ) {
        this._userFollowerUseCase = userFollowerUseCase;
    }

    @httpPost('/follower/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const followerId = req.params.id;
        const userId = req.userId;

        try {
            const tweetFound = await this._userFollowerUseCase.execute(
                new UuidVO(req.userId),
                new UuidVO(followerId)
            );
            res.status(200).send(tweetFound);
        } catch (error) {
            next(error);
        }
    }
}
