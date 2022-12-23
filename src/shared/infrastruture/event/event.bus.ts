import { injectable } from 'inversify';
import { DomainEvent } from '../../domain/events/domain.event';
import { EventBus } from '../../domain/types/event-bus.interface';
import { EventHandler } from '../../domain/types/event-handler.interface';
import { DomainEventMapping } from './domain-event-mapping';
import { EventEmitterBus } from './event-emitter.bus';

@injectable()
export class InMemoryAsyncEventBus implements EventBus {
    private bus: EventEmitterBus;

    constructor() {
        this.bus = new EventEmitterBus([]);
    }

    async start(): Promise<void> {
        /*  */
    }

    async publish(events: DomainEvent[]): Promise<void> {
        return this.bus.publish(events);
    }

    addSubscribers(subscribers: Array<EventHandler<DomainEvent>>) {
        console.log('subcriber', subscribers);
        this.bus.registerSubscribers(subscribers);
    }

    setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {
        /*  */
    }
}
