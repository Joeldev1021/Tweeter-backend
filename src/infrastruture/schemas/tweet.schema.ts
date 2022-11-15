import { Schema, model } from 'mongoose'
import { ITweet, ITweetDoc } from '../types/schemas/tweeter-doc.interface'

const schema = new Schema<ITweet>({
    _id: { type: String, id: false, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    ownerId: { type: String, required: true, ref: "User" },
    likes: [{ type: String, required: false, ref: "User" }],
    reply: [{ type: String, required: false, ref: "Reply" }],
    createdAt: { type: Date, required: true }
})

export const TweetSchema = model<ITweet>('Tweet', schema)
//export const TweetSchema: Model<ITweetDoc> = model('Tweet', schema)
