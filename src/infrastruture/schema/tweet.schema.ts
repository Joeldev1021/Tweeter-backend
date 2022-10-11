import { Schema, model } from 'mongoose'

const schema = new Schema({
    id: { type: String, _id: false, unique: true },
    description: { type: String, required: true },
    image: { type: String }
})


const TweetSchema = model('Tweet', schema)
