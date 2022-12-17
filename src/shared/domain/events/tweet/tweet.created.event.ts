import { DomainEvent } from '../domain.event';

type Payload = {
    tweetId: string;
    ownerId: string;
};

export class TweetCreatedEvent extends DomainEvent {
    static readonly eventName = TweetCreatedEvent.name;
    constructor(public readonly payload: Payload) {
        super(TweetCreatedEvent.name, payload);
    }
}
