import { DomainEvent } from '../events/domain.event';

export class AggregateRoot {
    private _events: DomainEvent[];

    constructor() {
        this._events = [];
    }

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = this._events.slice();
        this._events = [];
        return domainEvents;
    }
    /* add domain event */
    apply(event: DomainEvent) {
        this._events.push(event);
    }

    getEvents(): DomainEvent[] {
        return this._events;
    }
}
