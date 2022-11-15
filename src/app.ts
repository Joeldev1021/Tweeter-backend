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
import { connectDb } from "./connectDb";
/*============== routes=========== */
dotenv.config()

export const startApp = () => {

    const app = express()
    app.use(cors())

    const server = new InversifyExpressServer(container)

    server.setConfig((app) => {
        app.use(express.urlencoded({ extended: false }))
        app.use(express.json())
    });

    server.setErrorConfig((app) => {
        app.use(errorMiddleware);
    });

    connectDb()

    const appServer = server.build()
    /*     const serverListen = appServer.listen(PORT, () => {
            console.log(`Server running on port 🔥 ${PORT}`)
        })
     */
    return appServer
}