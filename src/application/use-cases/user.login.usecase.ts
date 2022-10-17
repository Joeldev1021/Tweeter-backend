import { UserModel } from "../../domain/models/user.model"
import { EmailVO } from "../../domain/value-objects/emial.vo"
import { PasswordVO } from "../../domain/value-objects/password.vo"
import UserRepository from "../../infrastruture/repositories/user.repository"
import { InvalidLoginException } from "../errors/invalid.login.exception"
import { UserIdNotFoundException } from "../errors/user.id.not.found.exception"

export class UserLoginUseCase {

    static async execute(email: string, password: string) {

        const userEmail = new EmailVO(email)
        const userPassword = new PasswordVO(password)

        const existsUser = await UserRepository.findByEmail(userEmail)
        if (!existsUser) throw new UserIdNotFoundException()

        const passworMatch = existsUser.password.compare(userPassword)
        if (!passworMatch) throw new InvalidLoginException()

        return existsUser
    }
}



