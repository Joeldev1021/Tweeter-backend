import mongoose from 'mongoose';

export const connectionDb = (): void => {
    if (process.env.NODE_ENV !== 'test') {
        mongoose
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .connect(process.env.MONGODB_URI!)
            .then(() => console.log('Connected to Mongo'))
            .catch(err => console.log('Failed to connect to Mongo', err));
    }
};
