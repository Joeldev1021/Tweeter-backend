import { Container } from 'inversify';
import { TYPES } from '../../../types';
import { TweetCreatedHandler } from '../../../user/application,/event-handlers/tweet.created.handler';
import { DomainEvent } from '../../domain/events/domain.event';
import { IDomainEventSubscriber } from '../../domain/types/domain.event.subscriber';

export class DomainEventSubscriber {
    private constructor(public items: IDomainEventSubscriber<DomainEvent>[]) {}

    static from(container: Container) {
        const subscribers: IDomainEventSubscriber<DomainEvent>[] = [];
        const tweetCreatedHandler = container.get<TweetCreatedHandler>(
            TYPES.TweetCreatedHandler
        ) as IDomainEventSubscriber<DomainEvent>;
        subscribers.push(tweetCreatedHandler);

        return new DomainEventSubscriber(subscribers);
    }
}
