import { inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { UsernameVO } from '../../domain/value-objects/username.vo';
import { controller, httpGet } from 'inversify-express-utils';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { TYPES } from '../../../types';
import { UserProfileUseCase } from '../../application/usecases/user.profile.usecase';

@controller('/user')
export class UserProfileController {
    constructor(
        @inject(TYPES.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {}
    @httpGet('/:username', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const { username } = req.params;
        try {
            const response = await this.userProfileUseCase.execute(
                new UsernameVO(username)
            );

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }
}
