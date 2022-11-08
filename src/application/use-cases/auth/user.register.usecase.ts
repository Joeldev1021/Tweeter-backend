import { inject, injectable } from "inversify"
import { UserModel } from "../../../domain/models/user.model"
import { EmailVO } from "../../../domain/value-objects/user/email.vo"
import { PasswordVO } from "../../../domain/value-objects/user/password.vo"
import { UsernameVO } from "../../../domain/value-objects/user/username.vo"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { UserRepository } from "../../../infrastruture/repositories/user.repository"
import { TYPES } from "../../../types"
import { UserEmailAlreadyExistsException } from "../../errors/user.email.already.exists.exception"
import { UserIdAlreadyExistsException } from "../../errors/user.id.already.exists"

@injectable()
export class UserRegisterUseCase {
    private userRepository: UserRepository
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    public async execute(id: UuidVO, username: UsernameVO, email: EmailVO, password: PasswordVO): Promise<UserModel | null> {

        const userFound = await this.userRepository.findById(id)
        if (userFound) throw new UserIdAlreadyExistsException()

        const userFoundEmail = await this.userRepository.findByEmail(email)
        if (userFoundEmail) throw new UserEmailAlreadyExistsException()

        return this.userRepository.create(new UserModel(id, username, email, password))
    }

}

