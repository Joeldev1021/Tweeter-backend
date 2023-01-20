import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import { connectionDb } from './connect.db';
import { Server } from './server';
import { Application } from 'express';
import * as http from 'http';
dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start(): Promise<void> {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);

        await this.dbConnection();
        await this.server.configureEventBus();
        return await this.server.listen();
    }

    private async dbConnection(): Promise<void> {
        connectionDb();
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
