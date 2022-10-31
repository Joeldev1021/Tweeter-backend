import { Schema, model, type Model } from 'mongoose'
import { ITweet, ITweetDoc } from '../types/schemas/tweeter-doc.interface'

const schema = new Schema<ITweet>({
    _id: { type: String, id: false, required: true },
    tweet: { type: String, required: true },
    image: { type: String, required: false },
    ownerId: { type: String, required: true },
    likes: [{ type: String, required: false }],
    reply: [{ type: String, required: false }],
})

export const TweetSchema = model<ITweet>('Tweet', schema)
//export const TweetSchema: Model<ITweetDoc> = model('Tweet', schema)
