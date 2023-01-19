import { DomainEvent } from '../events/domain.event';
export interface IDomainEventClass {
    NAME: string;
    fromPrimitives: (...args: any[]) => DomainEvent;
}
