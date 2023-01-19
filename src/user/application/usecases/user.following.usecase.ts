import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { IUserRepository } from '../../domain/repository/user.repository';
import { UserNotFoundException } from '../errors/user.not.found.exception';
import { IEventBus } from '../../../shared/domain/types/event-bus.interface';

@injectable()
export class UserFollowingUseCase {
    private _userRepository: IUserRepository;
    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.EventBus) private _eventBus: IEventBus
    ) {
        this._userRepository = userRepository;
    }

    public async execute(userId: UuidVO, followingId: UuidVO): Promise<void> {
        const existUser = await this._userRepository.findById(followingId);
        if (!existUser) throw new UserNotFoundException();

        await this._userRepository.following(userId, followingId);

        existUser.followingUser(userId, followingId);
        /* publish events */
        this._eventBus.publish(existUser.pullDomainEvents());
    }
}
