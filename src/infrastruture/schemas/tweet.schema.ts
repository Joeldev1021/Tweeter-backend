import { Schema, model } from 'mongoose'
import { ITweetSchema } from '../types/schemas/tweeter-doc.interface'

const schema = new Schema<ITweetSchema>({
    _id: { type: String, id: false, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    ownerId: { type: String, required: true, ref: "User" },
    likes: [{ type: String, required: false, ref: "User" }],
    reply: [{ type: String, required: false, ref: "Reply" }],
    createdAt: { type: Date, required: true }
}, {
    versionKey: false,
})

export const TweetSchema = model<ITweetSchema>('Tweet', schema)
//export const TweetSchema: Model<ITweetDoc> = model('Tweet', schema)
