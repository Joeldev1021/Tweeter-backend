import "reflect-metadata";
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './container';
/*============== routes=========== */
import './infrastruture/routes/index'
import { errorMiddleware } from "./infrastruture/middlewares/error.middleware";
//import { connectDb } from "./connectDb";
/*============== routes=========== */
dotenv.config()
//export const app = express();

const myError = (err: any, req: any, res: any, next: any) => {
    console.error("error");
    return res.status(500).send('Something broke!');
};


const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())

const server = new InversifyExpressServer(container)

server.setConfig((app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
});

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI!,)
        .then(() => console.log('Connected to Mongo'))
        .catch((err) => console.log('Failed to connect to Mongo', err))
}

server.setErrorConfig((app) => {
    app.use(errorMiddleware);
});

const appServer = server.build()
const serverListen = appServer.listen(PORT, () => {
    console.log(`Server running on port 🔥 ${PORT}`)
})

export {
    appServer,
    serverListen
}
