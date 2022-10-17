import { NextFunction, Request, Response } from "express";
import { IUserRegister, UserRequest } from "../../../infrastruture/interface/user.interface";

export interface IUserRegisterController {

    //execute(req: UserRequest<IUserRegister>, res: Response, next: NextFunction): Promise<any>
    execute(req: Request, res: Response, next: NextFunction): Promise<any>
}

