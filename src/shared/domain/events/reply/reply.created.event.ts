import { DomainEvent } from '../domain.event';

interface IPayload {
    replyId: string;
    ownerId: string;
    tweetId: string;
}

export class ReplyCreatedEvent extends DomainEvent {
    constructor(public payload: IPayload) {
        super(ReplyCreatedEvent.name, payload);
    }
}
