import mongoose from 'mongoose';

export const connectionDb = () => {
    if (process.env.NODE_ENV !== 'test') {
        mongoose
            .connect(process.env.MONGODB_URI!)
            .then(() => console.log('Connected to Mongo'))
            .catch(err => console.log('Failed to connect to Mongo', err));
    }
};
