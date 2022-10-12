import { UserModel } from "../../domain/models/user.model"
import { EmailVO } from "../../domain/value-objects/emial.vo"
import { PasswordVO } from "../../domain/value-objects/password.vo"
import { UsernameVO } from "../../domain/value-objects/username.vo"
import { UuidVO } from "../../domain/value-objects/uuid.vo"
import UserRepository from "../../infrastruture/repositories/user.repository"
import { UserEmailAlreadyExists } from "../errors/user.email.already.exists.exception"
import { UserIdAlreadyExists } from "../errors/user.id.already.exists"//import { IUser } from "../../infrastruture/interface/user.interface"

export const userRegisterUseCase = async (id: string, username: string, email: string, password: string) => {

    const userId = new UuidVO(id)
    const userEmail = new EmailVO(email)
    const userModel = new UserModel(userId,
        new UsernameVO(username),
        userEmail,
        await PasswordVO.create(password)
    )
    const userFound = await UserRepository.findById(userId)

    if (userFound) throw new UserIdAlreadyExists()

    const userFoundEmail = await UserRepository.findByEmail(userEmail)

    if (userFoundEmail) throw new UserEmailAlreadyExists()

    console.log(userModel)
    return userModel

}
