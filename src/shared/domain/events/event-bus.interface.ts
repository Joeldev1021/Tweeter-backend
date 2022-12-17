/* import { EventHandler } from '../types/event';
import { DomainEvent } from './domain.event';

export interface IEventBus {
    subscribe(eventName: string, handler: EventHandler): void;

    unsubscribe(eventName: string, handler: EventHandler): void;

    publish(event: DomainEvent): void | Promise<void>;

    publishMany(events: DomainEvent[]): void | Promise<void>;
}
 */

import { DomainEventSubscriber } from '../../infrastruture/event/domian.event.subscribers';
import { DomainEvent } from './domain.event';

export interface IEventBus {
    publish(events: DomainEvent[]): Promise<void>;
    addSubscribers(subscribers: DomainEventSubscriber): void;
}
