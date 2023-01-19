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
import * as http from 'http';
dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start(): Promise<void> {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);

        await this.dbConnection();
        await this.configureEventBus();
        return await this.server.listen();
    }

    private async dbConnection(): Promise<void> {
        connectionDb();
    }

    private async configureEventBus(): Promise<void> {
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        const eventHandlers = container.getAll<EventHandler>(
            coreTypes.EventHandler
        );
        const domainEventMapping = new DomainEventMapping(eventHandlers);

        eventBus.setDomainEventMapping(domainEventMapping);

        eventBus.addSubscribers(eventHandlers);

        await eventBus.start();
    }

    public getHttpServer(): http.Server | undefined {
        return this.server?.getHttpServer();
    }

    public getAppServer(): Application | undefined {
        return this.server?.getApp();
    }
}
/// init application
void new Bootstrap().start();
//todo search user by username query

//todo upload image

//todo I can choose to Post is private or public
