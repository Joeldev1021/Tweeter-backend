import { DomainEvent } from '../../domain/events/domain.event';
import { EventHandler } from '../../domain/types/event-handler.interface';

export class EventEmitterBus {
    constructor(
        private readonly subscribers: Array<EventHandler<DomainEvent>>
    ) {
        this.registerSubscribers(subscribers);
    }

    registerSubscribers(subscribers?: EventHandler<DomainEvent>[]) {
        this.subscribers.push(...(subscribers || []));
    }

    async publish(events: DomainEvent[]) {
        console.log(this.subscribers);
        await Promise.all(
            events.map(event =>
                Promise.all(
                    this.subscribers.map(h => {
                        h.handle(event);
                    })
                )
            )
        );
    }
}
