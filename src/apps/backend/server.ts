import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './dependency-injection/container';
/*============== routes=========== */
import './user/infrastructure/routers/index';
import './tweet/infrastruture/routers/index';
import './reply/infrastructure/routers/index';

/*============== routes=========== */
import * as http from 'http';
import { errorMiddleware } from '../../Contexts/shared/infrastruture/middlewares/error.middleware';
import { IEventBus } from '../../Contexts/shared/domain/types/event-bus.interface';
import { EventHandler } from '../../Contexts/shared/domain/types/event-handler.interface';
import { TYPES, coreTypes } from './dependency-injection/types';
import { DomainEventMapping } from '../../Contexts/shared/infrastruture/event/domain-event-mapping';
dotenv.config();

export class Server {
    private readonly app: express.Express;
    private readonly port?: string;
    private readonly server: InversifyExpressServer;
    private readonly appBuild: express.Application;
    private httpServer?: http.Server;

    constructor(port?: string) {
        this.port = port;
        this.app = express();
        this.app.use(cors());
        this.server = new InversifyExpressServer(container);

        this.server.setConfig(app => {
            app.use(express.urlencoded({ extended: false }));
            app.use(express.json());
        });

        this.server.setErrorConfig(app => {
            app.use(errorMiddleware);
        });

        this.appBuild = this.server.build();
    }

    async listen(): Promise<void> {
        this.httpServer = this.appBuild.listen(this.port, () => {
            console.log('server listening in port 🔥 ', this.port);
        });
    }

    getHttpServer(): http.Server | undefined {
        return this.httpServer;
    }

    getApp(): express.Application {
        return this.appBuild;
    }

    /* for test  */
    async configureEventBus(): Promise<void> {
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        const eventHandlers = container.getAll<EventHandler>(
            coreTypes.EventHandler
        );
        const domainEventMapping = new DomainEventMapping(eventHandlers);

        eventBus.setDomainEventMapping(domainEventMapping);

        eventBus.addSubscribers(eventHandlers);

        await eventBus.start();
    }
}
