import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../apps/backend/dependency-injection/Types';
import { UserRepository } from '../../domain/repository/UserRepository';
import { UserNotFoundException } from '../errors/UserNotFoundException';
import { UserId } from '../../../shared/domain/valueObjects/UserId';

@injectable()
export class UserUnfollowUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: UserRepository
    ) {}

    public async execute(userId: UserId, unfollowId: UserId): Promise<void> {
        const existUser = await this._userRepository.findById(unfollowId);

        if (!existUser) throw new UserNotFoundException();

        await this._userRepository.unfollow(userId, unfollowId);

        existUser.unfollowUser(userId, unfollowId);
    }
}
