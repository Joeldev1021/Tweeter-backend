import { DomainEventMapping } from '../../infrastruture/event/domain-event-mapping';
import { DomainEvent } from '../events/domain.event';
import { EventHandler } from './event-handler.interface';

export interface EventBus {
    setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
    publish(events: Array<DomainEvent>): Promise<void>;
    addSubscribers(subscribers: Array<EventHandler<DomainEvent>>): void;
    start(): Promise<void>;
}
