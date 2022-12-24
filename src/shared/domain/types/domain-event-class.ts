import { DomainEvent } from '../events/domain.event';
export type IDomainEventClass = {
    NAME: string;
    fromPrimitives(...args: any[]): DomainEvent;
};
