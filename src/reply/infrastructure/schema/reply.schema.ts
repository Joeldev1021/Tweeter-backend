import { Schema, model } from 'mongoose';
import { IReply } from '../interface/reply.interface';

const schema = new Schema<IReply>(
  {
    _id: { type: String, id: false, required: true },
    content: { type: String, required: true },
    tweetId: { type: String, required: true, ref: 'Tweet' },
    image: { type: String, required: false },
    ownerId: { type: String, required: true, ref: 'User' },
    likes: [{ type: String, required: false, ref: 'User' }],
    replyId: [{ type: String, required: false, ref: 'Reply' }],
  },
  {
    versionKey: false,
  }
);

export const ReplySchema = model<IReply>('Reply', schema);
