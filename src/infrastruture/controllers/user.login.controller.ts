import { NextFunction, Request, Response } from "express"
import { userLoginUseCase } from "../../application/use-cases/user.login.usecase"
import { MissingFieldException } from "../errors/missing.fields.exception"
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception"
import { IUserLogin, UserRequest } from "../interface/user.interface"

export class UserLoginController {

    static async execute(req: UserRequest<IUserLogin>, res: Response, next: NextFunction) {
        try {
            const { email, password, ...rest } = req.body
            if (!email || !password) throw new MissingFieldException()

            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }
            const userResponse = await userLoginUseCase(email, password)
            res.send(userResponse)
        } catch (error) {
            next(error)
        }

    }
} 