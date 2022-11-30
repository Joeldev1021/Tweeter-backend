import { Schema, model } from 'mongoose';
import { ITweetDoc } from '../interfaces/tweet.interface';

const schema = new Schema<ITweetDoc>(
    {
        _id: { type: String, id: false, required: true },
        content: { type: String, required: true },
        image: { type: String, required: false },
        ownerId: { type: String, required: true, ref: 'User' },
        likes: [{ type: String, required: false, ref: 'User' }],
        replys: [{ type: String, required: false, ref: 'Reply' }],
        createdAt: { type: Date, required: true },
    },
    {
        versionKey: false,
    }
);

export const TweetSchema = model<ITweetDoc>('Tweet', schema);
//export const TweetSchema: Model<ITweetDoc> = model('Tweet', schema)
