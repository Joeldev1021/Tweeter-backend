import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { userRegisterUseCase } from "../../application/use-cases/user.register.usecase";
import { MissingFieldException } from "../errors/missing.fields.exception";
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception";
import { IUserRegister, UserRequest } from "../interface/user.interface";

export class UserRegisterController {

    static async execute(req: UserRequest<IUserRegister>, res: Response, next: NextFunction) {
        if (!req.body) throw new MissingFieldException()
        const { _id, email, password, username, ...rest } = req.body
        try {
            if (!_id && !username && !email && !password) {
                throw new MissingFieldException()
            }
            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }

            const user = await userRegisterUseCase(_id, username, email, password!)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
}
