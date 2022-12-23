import { IDomainEventClass } from '../../domain/types/domain-event-class';
import { EventHandler } from '../../domain/types/event-handler.interface';
import { DomainEvent } from '../../domain/events/domain.event';

type Mapping = Map<string, IDomainEventClass>;
export class DomainEventMapping {
    private mapping: Mapping;

    constructor(mapping: EventHandler<DomainEvent>[]) {
        this.mapping = mapping.reduce(
            this.eventsExtractor(),
            new Map<string, IDomainEventClass>()
        );
    }

    private eventsExtractor() {
        return (map: Mapping, subscriber: EventHandler<DomainEvent>) => {
            subscriber.subscribedTo().forEach(this.eventNameExtractor(map));
            return map;
        };
    }

    private eventNameExtractor(
        map: Mapping
    ): (domainEvent: IDomainEventClass) => void {
        return domainEvent => {
            const eventName = domainEvent.NAME;
            map.set(eventName, domainEvent);
        };
    }

    for(name: string) {
        const domainEvent = this.mapping.get(name);

        if (!domainEvent) {
            return;
        }

        return domainEvent;
    }
}
