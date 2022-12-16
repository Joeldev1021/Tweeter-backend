import uuid from 'uuid-random';

export class DomainEvent<
    TPayload extends Record<string, any> = Record<string, any>
> {
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
