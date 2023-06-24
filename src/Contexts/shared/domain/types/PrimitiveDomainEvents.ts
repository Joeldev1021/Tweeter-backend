import { AnyObject } from './any-object';

export interface PrimitiveDomainEvent {
    eventName: string;
    aggregateId: string;
    eventId: string;
    timestamp: number;
    payload?: AnyObject;
}
