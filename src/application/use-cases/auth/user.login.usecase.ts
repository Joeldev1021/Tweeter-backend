import { inject, injectable } from "inversify"
import { EmailVO } from "../../../domain/value-objects/user/email.vo"
import { PasswordVO } from "../../../domain/value-objects/user/password.vo"
import { UserRepository } from "../../../infrastruture/repositories/user.repository"
import { TYPES } from "../../../types"
import { InvalidLoginException } from "../../errors/invalid.login.exception"
import { UserNotFoundException } from "../../errors/user.not.found.exception"
import { signTokenAsync } from '../../../infrastruture/services/jwt.services'

@injectable()
export class UserLoginUseCase {
    public userRepository: UserRepository
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    public async execute(email: EmailVO, password: PasswordVO): Promise<{ token: string }> {


        const existsUser = await this.userRepository.findByEmail(email)
        if (!existsUser) throw new UserNotFoundException()

        const passworMatch = existsUser.password.compare(password)
        if (!passworMatch) throw new InvalidLoginException()

        const token = await signTokenAsync({ id: existsUser.id.value }, { expiresIn: '1d' })

        return { token }
    }
}



