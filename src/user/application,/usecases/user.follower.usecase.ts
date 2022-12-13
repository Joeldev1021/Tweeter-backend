import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { IUserRepository } from '../../domain/repository/user.repository';
import { UserNotFoundException } from '../errors/user.not.found.exception';

@injectable()
export class UserFollowerUseCase {
    private _userRepository: IUserRepository;
    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    public async execute(userId: UuidVO, followerId: UuidVO): Promise<void> {
        await this._userRepository.follower(userId, followerId);
    }
}
