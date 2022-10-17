import { NextFunction, Request, Response } from "express";
import { UserRegisterUseCase } from "../../application/use-cases/user.register.usecase";
import { MissingFieldException } from "../errors/missing.fields.exception";
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception";
import { injectable } from "inversify";
import { IUserRegisterController } from "../../domain/interface/controller/user.register.controller";
import { httpPost } from 'inversify-express-utils'
//import { IUserRegister, UserRequest } from "../interface/user.interface";
@injectable()
export class UserRegisterController implements IUserRegisterController {
    /* constructor(
        @inject(ContainerTypes.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {
    } */
    @httpPost('/register')
    async execute(req: Request, res: Response, next: NextFunction): Promise<any> {
        if (!req.body) throw new MissingFieldException()
        const { _id, email, username, password, ...rest } = req.body
        try {
            if (!_id && !username && !email && !password) {
                throw new MissingFieldException()
            }
            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }

            //const user = await UserRegisterUseCase(_id, username, email, password)
            //res.json(user)
        } catch (error) {
            next(error)
        }
    }
}
