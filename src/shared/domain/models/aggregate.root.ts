import { DomainEvent } from '../events/event';

export class AggregateRoot {
    public readonly _events: DomainEvent[];

    constructor() {
        this._events = [];
    }

    apply(event: DomainEvent) {
        this._events.push(event);
    }

    getEvents(): DomainEvent[] {
        return this._events;
    }
}
