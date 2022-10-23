import { inject, injectable } from "inversify"
import { UserModel } from "../../domain/models/user.model"
import { IUserRepository } from "../../domain/repository/user.repository"
import { EmailVO } from "../../domain/value-objects/user/email.vo"
import { PasswordVO } from "../../domain/value-objects/user/password.vo"
import { UsernameVO } from "../../domain/value-objects/user/username.vo"
import { UuidVO } from "../../domain/value-objects/uuid.vo"
import { UserRepository } from "../../infrastruture/repositories/user.repository"
import { TYPES } from "../../types"
import { UserEmailAlreadyExists } from "../errors/user.email.already.exists.exception"
import { UserIdAlreadyExists } from "../errors/user.id.already.exists"//import { IUser } from "../../infrastruture/interface/user.interface"

@injectable()
export class UserRegisterUseCase {
    private userRepository: UserRepository
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    public async execute(id: string, username: string, email: string, password: string): Promise<UserModel> {

        const userId = new UuidVO(id)
        const userEmail = new EmailVO(email)
        const userModel = new UserModel(userId,
            new UsernameVO(username),
            userEmail,
            await PasswordVO.create(password)
        )
        const userFound = await this.userRepository.findById(userId)
        if (userFound) throw new UserIdAlreadyExists()

        const userFoundEmail = await this.userRepository.findByEmail(userEmail)

        if (userFoundEmail) throw new UserEmailAlreadyExists()

        return userModel
    }

}

