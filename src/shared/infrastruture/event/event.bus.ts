import EventEmitter2 from 'eventemitter2';
import { EventEmitter } from 'events';
import { injectable } from 'inversify';
import { DomainEvent } from '../../domain/events/domain.event';
import { IEventBus } from '../../domain/events/event-bus.interface';
//import { EventHandler } from '../../domain/types/event';
import { DomainEventSubscriber } from './domian.event.subscribers';

/* @injectable()
export class EventBus implements IEventBus {
    private readonly _eventEmitter: EventEmitter2;
    constructor() {
        this._eventEmitter = new EventEmitter2();
    }
    subscribe(eventName: string, handler: EventHandler): void {
        this._eventEmitter.on(eventName, handler);
    }

    unsubscribe(eventName: string, handler: EventHandler): void {
        this._eventEmitter.off(eventName, handler);
    }

    publish(event: DomainEvent): void | Promise<void> {
        this._eventEmitter.emit(event.name, event);
    }

    publishMany(events: DomainEvent[]): void | Promise<void> {
        events.forEach(event => {
            this._eventEmitter.emit(event.name, event);
        });
    }
}
 */

@injectable()
export class EventBus implements IEventBus {
    private readonly _eventEmitter: EventEmitter2;

    constructor() {
        this._eventEmitter = new EventEmitter2();
    }
    async publish(events: DomainEvent[]): Promise<void> {
        events.map(event => {
            this._eventEmitter.emit(event.name, event);
        });
    }

    addSubscribers(subscribers: DomainEventSubscriber): void {
        subscribers.items.forEach(subscriber => {
            subscriber.subscribedTo().forEach(event => {
                this._eventEmitter.on(
                    event.eventName,
                    subscriber.on.bind(subscriber)
                );
            });
        });
    }
}
