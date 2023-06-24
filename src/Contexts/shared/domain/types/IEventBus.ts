import { DomainEventMapping } from '../../infrastruture/event/domain-event-mapping';
import { DomainEvent } from '../events/domain.event';
import { EventHandler } from './event-handler.interface';

export interface IEventBus {
    setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
    publish(events: DomainEvent[]): Promise<void>;
    addSubscribers(subscribers: Array<EventHandler<DomainEvent>>): void;
    start(): Promise<void>;
}
