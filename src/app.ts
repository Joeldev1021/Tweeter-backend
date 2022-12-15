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
import { connectDb } from './connectDb';
import { configureEventBus } from './configure.eventBus';
dotenv.config();

export const startApp = () => {
    const app = express();
    app.use(cors());

    const server = new InversifyExpressServer(container);

    server.setConfig(app => {
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
    });

    server.setErrorConfig(app => {
        app.use(errorMiddleware);
    });

    connectDb();

    configureEventBus();

    const appServer = server.build();

    return appServer;
};

//todo do not implement ====> find reply by parent-ReplyId with owner-data
