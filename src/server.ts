import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './container';
/*============== routes=========== */
import './user/infrastructure/routers/index';
import './tweet/infrastruture/routers/index';
import './reply/infrastructure/routers/index';

/*============== routes=========== */
import { errorMiddleware } from './shared/infrastruture/middlewares/error.middleware';
import * as http from 'http';
import { TYPES } from './types';
import { IEventBus } from './shared/domain/events/event-bus.interface';
import { DomainEventSubscriber } from './shared/infrastruture/event/domian.event.subscribers';
dotenv.config();

export class Server {
    private app: express.Express;
    private port?: string;
    private server: InversifyExpressServer;
    private appBuild: express.Application;
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

        this.configureEventBus();
        this.appBuild = this.server.build();
    }

    private async configureEventBus() {
        const eventBus = container.get<IEventBus>(TYPES.EventBus);
        eventBus.addSubscribers(DomainEventSubscriber.from(container));
    }

    async listen() {
        this.httpServer = this.appBuild.listen(this.port, () => {
            console.log('server listening in port 🔥 ', this.port);
        });
    }

    getHttpServer() {
        return this.httpServer;
    }

    getApp() {
        return this.appBuild;
    }
}

//todo do not implement ====> find reply by parent-ReplyId with owner-data
