import { DomainEvent } from '../domain.event';
import uuid from 'uuid-random';

interface IPayload {
    userId: string;
    unfollowId: string;
}

export class UserUnfollowedEvent extends DomainEvent {
    static NAME = UserUnfollowedEvent.name;
    constructor(public readonly payload: IPayload) {
        super(UserUnfollowedEvent.NAME, uuid());
    }
}
