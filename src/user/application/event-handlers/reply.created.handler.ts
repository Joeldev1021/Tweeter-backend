import { inject, injectable } from 'inversify';
import { ReplyCreatedEvent } from '../../../shared/domain/events/reply/reply.created.event';
import { IDomainEventClass } from '../../../shared/domain/types/domain-event-class';
import { EventHandler } from '../../../shared/domain/types/event-handler.interface';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { IUserRepository } from '../../domain/repository/user.repository';

@injectable()
export class ReplyCreatedHandler implements EventHandler {
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository
    ) {}

    subscribedTo(): IDomainEventClass[] {
        return [ReplyCreatedEvent];
    }

    //name event ReplyCreateEvent
    async handle(event: ReplyCreatedEvent) {
        const { ownerId } = event.payload;

        const user = await this._userRepository.findById(new UuidVO(ownerId));

        //user?.replyIds(replyId)
    }
}
