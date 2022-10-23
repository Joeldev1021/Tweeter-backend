import { NextFunction, Request, Response } from "express";
import { UserRegisterUseCase } from "../../application/use-cases/user.register.usecase";
import { MissingFieldException } from "../errors/missing.fields.exception";
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../../types";
import { UserRequest } from "../types/user.interface";
import { IUser } from "../types/schemas/user-doc.interface";
import { UserRegistertDtoType } from "../dtos/user-register.dto";

@controller('/auth')
export class UserRegisterController {
    constructor(
        @inject(TYPES.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {
    }
    @httpPost('/register')
    async execute(req: UserRequest<UserRegistertDtoType>, res: Response, next: NextFunction) {

        const { _id, email, username, password, ...rest } = req.body
        try {
            if (!_id && !username && !email && !password) {
                throw new MissingFieldException()
            }
            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }
            const user = await this.userRegisterUseCase.execute(_id, username, email, password)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
}
