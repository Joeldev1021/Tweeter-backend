import { NextFunction, Request, Response } from "express";
import { UserRegisterUseCase } from "../../application/use-cases/auth/user.register.usecase";
import { MissingFieldException } from "../errors/missing.fields.exception";
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { TYPES } from "../../types";
import { UserProfileUseCase } from "../../application/use-cases/user.profile.usecase";
import { UuidVO } from "../../domain/value-objects/uuid.vo";

@controller('/user')
export class UserProfileController {
    constructor(
        @inject(TYPES.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {
    }
    @httpGet('/profile/:id')
    async execute(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const user = await this.userProfileUseCase.execute(new UuidVO(id))
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
}