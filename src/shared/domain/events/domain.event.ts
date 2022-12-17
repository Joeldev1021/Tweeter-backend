import uuid from 'uuid-random';

export abstract class DomainEvent<
    TPayload extends Record<string, any> = Record<string, any>
> {
    static readonly eventName: string;
    static fromPrimitives: (params: {
        eventId: string;
        name: string;
        issueAt: string;
        attributes: DomainEventAttributes;
    }) => DomainEvent;

    public readonly eventId: string;
    public readonly issuedAt: Date;

    constructor(
        public readonly name: string,
        public readonly payload: TPayload
    ) {
        this.eventId = uuid();
        this.issuedAt = new Date();
    }
}

export type DomainEventClass = {
    eventName: string;
    fromPrimitives(params: {
        eventId: string;
        issueAt: string;
        attributes: DomainEventAttributes;
    }): DomainEvent;
};

type DomainEventAttributes = any;
