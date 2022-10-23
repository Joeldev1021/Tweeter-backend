import { Schema, model, Model } from 'mongoose'
import { ITweet, ITweetDoc } from '../types/schemas/tweeter-doc.interface'

const schema = new Schema({
    _id: { type: String, _id: false, unique: true, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    ownerId: { type: String, required: true },
    likes: [{ type: String, required: false }]
})

export const TweetSchema = model<ITweet>('Tweet', schema)
//export const TweetSchema: Model<ITweetDoc> = model('Tweet', schema)
