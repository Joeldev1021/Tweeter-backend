import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import mongoose from 'mongoose';
import { connectionDb } from './connect.db';
import { container } from './container';
import { Server } from './server';
import { IEventBus } from './shared/domain/events/event-bus.interface';
import { TYPES } from './types';
import { TweetCreatedHandler } from './user/application,/event-handlers/tweet.created.handler';
import { TweetCreatedEvent } from './shared/domain/events/tweet/tweet.created.event';

dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);
        await this.configureEventBus();
        await this.dbConnection();
        await this.server.listen();
    }

    private async dbConnection() {
        await connectionDb();
    }

    private async configureEventBus() {
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        const tweetCreatedHandler = container.get<TweetCreatedHandler>(
            TYPES.TweetCreatedHandler
        );
        eventBus.subscribe('TweetCreatedEvent', TweetCreatedEvent);
    }
}
/// init application
new Bootstrap().start();
