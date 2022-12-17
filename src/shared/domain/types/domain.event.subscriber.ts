import { DomainEvent, DomainEventClass } from '../events/domain.event';

export interface IDomainEventSubscriber<T extends DomainEvent> {
    subscribedTo(): DomainEventClass[];
    on(domainEvent: T): Promise<void>;
}
