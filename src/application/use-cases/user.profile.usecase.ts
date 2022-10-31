import { inject, injectable } from "inversify"
import { UserRepository } from "../../infrastruture/repositories/user.repository"
import { TYPES } from "../../types"
import { UserNotFoundException } from "../errors/user.not.found.exception"
import { UserModel } from "../../domain/models/user.model"
import { UuidVO } from "../../domain/value-objects/uuid.vo"

@injectable()
export class UserProfileUseCase {
    public userRepository: UserRepository
    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    public async execute(id: UuidVO): Promise<UserModel | undefined> {

        const user = await this.userRepository.findById(id)
        if (!user) throw new UserNotFoundException()

        return user

    }
}