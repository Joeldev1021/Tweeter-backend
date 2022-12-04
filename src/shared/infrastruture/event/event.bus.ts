import { EventEmitter2 } from 'eventemitter2';
import { DomainEvent } from '../../domain/events/event';
import { IEventBus } from '../../domain/events/event-bus.interface';
import { EventHandler } from '../../domain/types/event';

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

    publisMany(events: DomainEvent[]): void | Promise<void> {
        events.forEach(event => {
            this._eventEmitter.emit(event.name, event);
        });
    }
}
