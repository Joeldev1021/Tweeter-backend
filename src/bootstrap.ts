import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import { connectionDb } from './connect.db';
import { container } from './container';
import { Server } from './server';
import { IEventBus } from './shared/domain/types/event-bus.interface';
import { coreTypes, TYPES } from './types';
import { Application } from 'express';
import { EventHandler } from './shared/domain/types/event-handler.interface';
import { DomainEventMapping } from './shared/infrastruture/event/domain-event-mapping';

dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);
        await this.configureEventBus();
        await this.dbConnection();
        return this.server.listen();
    }

    private async dbConnection() {
        connectionDb();
    }
    private async configureEventBus() {
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        const eventHandlers = container.getAll<EventHandler>(
            coreTypes.EventHandler
        );
        const domainEventMapping = new DomainEventMapping(eventHandlers);

        eventBus.setDomainEventMapping(domainEventMapping);

        eventBus.addSubscribers(eventHandlers);

        await eventBus.start();
    }
    public getHttpServer() {
        return this.server?.getHttpServer();
    }

    public getAppServer(): Application | undefined {
        return this.server?.getApp();
    }
}
/// init application
new Bootstrap().start();
