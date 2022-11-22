import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { TYPES } from "../../../types";
import { UserProfileUseCase } from "../../../application/use-cases/profile/user.profile.usecase";
import { AuthRequest } from "infrastruture/types";
import { UsernameVO } from "../../../domain/value-objects/user/username.vo";

@controller('/user')
export class UserProfileController {
    constructor(
        @inject(TYPES.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {
    }
    @httpGet('/:username', TYPES.AuthMiddleware)
    async execute(req: AuthRequest<Request>, res: Response, next: NextFunction) {
        const { username } = req.params;
        try {
            const user = await this.userProfileUseCase.execute(new UsernameVO(username))
            res.status(200).send(user)
        } catch (error) {
            next(error)
        }
    }
}