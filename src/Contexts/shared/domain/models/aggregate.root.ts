import { DomainEvent } from '../events/domain.event';

export class AggregateRoot {
    private _domainEvents: DomainEvent[];

    constructor() {
        this._domainEvents = [];
    }

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = this._domainEvents.slice();
        this._domainEvents = [];
        return domainEvents;
    }

    /* add domain event */
    record(event: DomainEvent): void {
        this._domainEvents.push(event);
    }

    getEvents(): DomainEvent[] {
        return this._domainEvents;
    }
}
