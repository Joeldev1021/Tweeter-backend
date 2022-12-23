import { DomainEvent } from '../events/domain.event';
import { IDomainEventClass } from '../types/domain-event-class';

export interface EventHandler<T extends DomainEvent = DomainEvent> {
    subscribedTo(): Array<IDomainEventClass>;
    handle(domainEvent: T): void | Promise<void>;
}

export interface MessageHandler<T extends {}> {
    subscribedTo(): Array<IDomainEventClass>;
    handle(domainEvent: T): void | Promise<void>;
}
