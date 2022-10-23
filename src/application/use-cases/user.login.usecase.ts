import { inject, injectable } from "inversify"
import { EmailVO } from "../../domain/value-objects/user/email.vo"
import { PasswordVO } from "../../domain/value-objects/user/password.vo"
import { UserRepository } from "../../infrastruture/repositories/user.repository"
import { TYPES } from "../../types"
import { InvalidLoginException } from "../errors/invalid.login.exception"
import { UserIdNotFoundException } from "../errors/user.id.not.found.exception"

@injectable()
export class UserLoginUseCase {
    public userRepository: UserRepository
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    public async execute(email: string, password: string) {

        const userEmail = new EmailVO(email)
        const userPassword = new PasswordVO(password)

        const existsUser = await this.userRepository.findByEmail(userEmail)
        if (!existsUser) throw new UserIdNotFoundException()

        const passworMatch = existsUser.password.compare(userPassword)
        if (!passworMatch) throw new InvalidLoginException()

        return existsUser
    }
}



