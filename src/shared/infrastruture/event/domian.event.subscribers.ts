import { Container } from 'inversify';

export class DomainEventSubscribers {
    static from(container: Container) {
        console.log(container);
    }
}
