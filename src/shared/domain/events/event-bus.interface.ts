import { EventHandler } from '../types/event';
import { DomainEvent } from './event';

export interface IEventBus {
    subscribe(eventName: string, handler: EventHandler): void;

    unsubscribe(eventName: string, handler: EventHandler): void;

    publish(event: DomainEvent): void | Promise<void>;

    publisMany(events: DomainEvent[]): void | Promise<void>;
}
