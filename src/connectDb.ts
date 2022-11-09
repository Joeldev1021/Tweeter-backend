import mongoose from "mongoose"
import { config } from 'dotenv'
config()
export const connectDb = async () => {
    if (process.env.NODE_ENV !== 'test') {
        mongoose.connect(process.env.MONGODB_URI!,)
            .then(() => console.log('Connected to Mongo'))
            .catch((err) => console.log('Failed to connect to Mongo', err))
    }


}
