import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { IUserRepository } from '../../domain/repository/user.repository';
import { UserNotFoundException } from '../errors/user.not.found.exception';

@injectable()
export class UserUnfollowUseCase {
    private _userRepository: IUserRepository;
    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    public async execute(userId: UuidVO, unfollowId: UuidVO): Promise<void> {
        const existUser = await this._userRepository.findById(unfollowId);
        if (!existUser) throw new UserNotFoundException();

        await this._userRepository.unfollow(userId, unfollowId);

        existUser.unfollowUser(userId, unfollowId);
    }
}
