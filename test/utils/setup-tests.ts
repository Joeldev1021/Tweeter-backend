import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

const connectDb = async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
};

const closeDb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    //(await app).serverListen.close();
};

const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        collections[key].deleteMany({});
    }
};

export { connectDb, closeDb, clear };
