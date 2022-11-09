import { inject, injectable } from "inversify"
import { EmailVO } from "../../../domain/value-objects/user/email.vo"
import { PasswordVO } from "../../../domain/value-objects/user/password.vo"
import { UserRepository } from "../../../infrastruture/repositories/user.repository"
import { TYPES } from "../../../types"
import { JwtService } from '../../../infrastruture/services/jwt.services'
import { InvalidLoginException } from "../../errors/invalid.login.exception"

@injectable()
export class UserLoginUseCase {
    public userRepository: UserRepository;
    constructor(
        @inject(TYPES.JwtService) private readonly _jwtService: JwtService,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    public async execute(email: EmailVO, password: PasswordVO): Promise<{ token: string } | null> {


        const existsUser = await this.userRepository.findByEmail(email)
        if (!existsUser) throw new InvalidLoginException()

        const passworMatch = await existsUser.password.compare(password)
        if (!passworMatch) throw new InvalidLoginException()

        const token = await this._jwtService.signToken({ id: existsUser.id.value }, { expiresIn: '1d' })
        return { token }
    }
}



