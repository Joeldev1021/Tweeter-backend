import { NextFunction, Request, Response } from "express"; import { userRegisterUseCase } from "../../application/use-cases/user.register.usecase";
import { MissingFieldException } from "../errors/missing.fields.exception";
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception";
import { IUser } from "../interface/user.interface";

export class UserRegsiterController {

    async execute(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new MissingFieldException()

        const { _id, username, email, password, ...rest } = req.user
        try {
            if (!_id && !username && !email && !password) {
                throw new MissingFieldException()
            }
            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }
            const user = await userRegisterUseCase(_id, username, email, password)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
}
