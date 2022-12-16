import { config as dotenvConfig } from 'dotenv';
import mongoose from 'mongoose';
import { Server } from './server';

dotenvConfig();

export class Bootstrap {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);
        await this.connectDb();
        await this.server.listen();
    }

    private async connectDb() {
        if (process.env.NODE_ENV !== 'test') {
            mongoose
                .connect(process.env.MONGODB_URI!)
                .then(() => console.log('Connected to Mongo'))
                .catch(err => console.log('Failed to connect to Mongo', err));
        }
    }

    private async configureEventBus() {
        console.log('configuration event bus');
    }
}
/// init application
new Bootstrap().start();
