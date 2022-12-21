import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import { connectionDb } from './connect.db';
import { container } from './container';
import { Server } from './server';
import { IEventBus } from './shared/domain/events/event-bus.interface';
import { TYPES } from './types';
import { TweetCreatedEvent } from './shared/domain/events/tweet/tweet.created.event';
import { TweetCreatedHandler } from './user/application,/event-handlers/tweet.created.handler';
import { EventBus } from './shared/infrastruture/event/event.bus';

dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);
        this.configureEventBus();
        await this.dbConnection();
        await this.server.listen();
    }

    private async dbConnection() {
        await connectionDb();
    }

    private async configureEventBus() {
        const eventBus = container.resolve<IEventBus>(EventBus);
        const tweetCreatedHandler = container.resolve(TweetCreatedHandler);
    }
}
/// init application
new Bootstrap().start();
