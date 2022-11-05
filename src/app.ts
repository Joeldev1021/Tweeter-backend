import "reflect-metadata";
import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './container';
/*============== routes=========== */
import './infrastruture/routes/index'
//import { connectDb } from "./connectDb";
/*============== routes=========== */
dotenv.config()
//export const app = express();

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())

const server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
})
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI!,)
        .then(() => console.log('Connected to Mongo'))
        .catch((err) => console.log('Failed to connect to Mongo', err))
}

const appServer = server.build()
const serverListen = appServer.listen(PORT, () => {
    console.log(`Server running on port 🔥 ${PORT}`)
})

export {
    appServer,
    serverListen
}
