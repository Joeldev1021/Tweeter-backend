import { DomainEvent } from '../domain.event';
import uuid from 'uuid-random';

interface IPayload {
    userId: string;
}

export class UserCreatedEvent extends DomainEvent {
    static NAME = UserCreatedEvent.name;
    constructor(public readonly payload: IPayload) {
        super(UserCreatedEvent.NAME, uuid());
    }
}
