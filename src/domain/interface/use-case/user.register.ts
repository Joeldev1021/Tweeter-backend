import { UserModel } from "../../models/user.model";

export interface IUserRegisterUseCase {
    execute(id: string, username: string, email: string, password: string): Promise<UserModel>
}