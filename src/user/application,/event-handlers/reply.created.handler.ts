import { inject } from 'inversify';
import { ReplyCreatedEvent } from '../../../shared/domain/events/reply/reply.created.event';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

export class ReplyCreatedHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository
    ) {}
    //name event ReplyCreateEvent
    async execute(event: ReplyCreatedEvent) {
        const { ownerId, replyId } = event.payload;

        const user = await this._userRepository.findById(new UuidVO(ownerId));

        //user?.replyIds(replyId)
    }
}
