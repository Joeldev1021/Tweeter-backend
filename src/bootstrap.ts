import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import { connectionDb } from './connect.db';
import { container } from './container';
import { Server } from './server';
import { IEventBus } from './shared/domain/events/event-bus.interface';
import { TYPES } from './types';
import { DomainEventSubscriber } from './shared/infrastruture/event/domian.event.subscribers';
import { Application } from 'express';

dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);
        //        await this.configureEventBus();
        await this.dbConnection();
        return this.server.listen();
    }

    private async dbConnection() {
        connectionDb();
    }
    /*     private async configureEventBus() {
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        eventBus.addSubscribers(DomainEventSubscriber.from(container));
    }
 */
    public getHttpServer() {
        return this.server?.getHttpServer();
    }

    public getAppServer(): Application | undefined {
        return this.server?.getApp();
    }
}
/// init application
new Bootstrap().start();
