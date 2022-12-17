import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import mongoose from 'mongoose';
import { connectionDb } from './connect.db';
import { container } from './container';
import { Server } from './server';
import { IEventBus } from './shared/domain/events/event-bus.interface';
import { TYPES } from './types';

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
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        //eventBus.subscribe('TweetCreatedEvent', );
    }
}
/// init application
new Bootstrap().start();
