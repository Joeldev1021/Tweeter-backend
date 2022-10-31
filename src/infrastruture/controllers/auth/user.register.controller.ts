import { NextFunction, Request, Response } from "express";
import { UserRegisterUseCase } from "../../../application/use-cases/auth/user.register.usecase";
import { MissingFieldException } from "../../errors/missing.fields.exception";
import { UnnecesayFieldsExceptions } from "../../errors/unnecesay.fields.exception";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../../../types";
import { UserRequest } from "../../types";
import { IUser } from "../../types/schemas/user-doc.interface";
import { UserRegistertDtoType } from "../../dtos/user-register.dto";
import { UuidVO } from "../../../domain/value-objects/uuid.vo";
import { EmailVO } from "../../../domain/value-objects/user/email.vo";
import { UsernameVO } from "../../../domain/value-objects/user/username.vo";
import { PasswordVO } from "../../../domain/value-objects/user/password.vo";

@controller('/auth')
export class UserRegisterController {
    constructor(
        @inject(TYPES.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {
    }
    @httpPost('/register')
    async execute(req: UserRequest<UserRegistertDtoType>, res: Response, next: NextFunction) {

        const { id, email, username, password, ...rest } = req.body
        try {
            if (!id && !username && !email && !password) {
                throw new MissingFieldException()
            }
            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }
            const user = await this.userRegisterUseCase.execute(
                new UuidVO(id),
                new EmailVO(email),
                new UsernameVO(username,),
                await PasswordVO.create(password),
            )
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
}
