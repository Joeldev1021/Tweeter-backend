import { DomainEvent } from '../domain.event';
import uuid from 'uuid-random';

interface IPayload {
    replyId: string;
    ownerId: string;
    tweetId: string;
}

export class ReplyCreatedEvent extends DomainEvent {
    static readonly NAME = ReplyCreatedEvent.name;
    constructor(public payload: IPayload) {
        super(ReplyCreatedEvent.NAME, uuid());
    }
}
