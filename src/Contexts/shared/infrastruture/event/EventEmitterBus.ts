import { DomainEvent } from '../../domain/events/domain.event';
import { EventHandler } from '../../domain/types/event-handler.interface';

export class EventEmitterBus {
    constructor(
        private readonly subscribers: Array<EventHandler<DomainEvent>>
    ) {
        this.registerSubscribers(subscribers);
    }

    registerSubscribers(subscribers?: Array<EventHandler<DomainEvent>>): void {
        this.subscribers.push(...(subscribers || []));
    }

    async publish(events: DomainEvent[]): Promise<void> {
        await Promise.all(
            events.map(
                async event =>
                    await Promise.all(
                        this.subscribers
                            .filter(sub =>
                                sub
                                    .subscribedTo()
                                    .some(ev => ev.NAME === event.eventName)
                            )
                            .map(handle => handle.handle(event))
                    )
            )
        );
    }
}
