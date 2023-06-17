import { DomainEvent } from '../domain.event';
import uuid from 'uuid-random';

interface IPayload {
    userId: string;
    followerId: string;
}

export class UserFollowingAfterEvent extends DomainEvent {
    static NAME = UserFollowingAfterEvent.name;
    constructor(public readonly payload: IPayload) {
        super(UserFollowingAfterEvent.NAME, uuid());
    }
}
