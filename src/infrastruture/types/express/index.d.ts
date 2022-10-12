import { IUser } from "../../interface/user.interface";

// to make the file a module and avoid the TypeScript error
export { }

declare module 'express-serve-static-core' {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}