import { config as dotenvConfig } from 'dotenv';
import mongoose from 'mongoose';
import { connectionDb } from './connect.db';
import { container } from './container';
import { Server } from './server';

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
        const eventBus = container.get('EventBus');
        console.log('configuration event bus');
    }
}
/// init application
new Bootstrap().start();
