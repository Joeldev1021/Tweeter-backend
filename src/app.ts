import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { indexRoutes } from './infrastruture/routes'
dotenv.config()

const PORT = process.env.PORT || 3000

export const bootstrap = async () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    app.use('/', indexRoutes)

    mongoose.connect(process.env.MONGODB_URI!)
        .then(() => console.log('Connected to Mongo'))
        .catch((err) => console.log('Failed to connect to Mongo', err))

    app.listen(PORT, () => {
        console.log(`Server running on port 🔥 ${PORT}`)
    })

}
