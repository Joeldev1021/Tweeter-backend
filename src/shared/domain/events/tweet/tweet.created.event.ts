import { DomainEvent } from '../domain.event';
import uuid from 'uuid-random';

interface IPayload {
    tweetId: string;
    ownerId: string;
}

export class TweetCreatedEvent extends DomainEvent {
    static readonly NAME = TweetCreatedEvent.name;
    constructor(public readonly payload: IPayload) {
        super(TweetCreatedEvent.NAME, uuid());
    }
}
