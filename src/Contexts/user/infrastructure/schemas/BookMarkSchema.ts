import { Schema, model } from 'mongoose';
import { IBookMark } from '../interface/IBookMark';

const schema = new Schema<IBookMark>({
    _id: { type: String, id: false, required: true },
    ownerId: { type: String, required: true, ref: 'User' },
    tweetIds: [{ type: String, required: false, ref: 'Tweet' }],
    replyIds: [{ type: String, required: false, ref: 'Reply' }],
});

export const BookMarkSchema = model<IBookMark>('BookMark', schema);
