import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

const schema = new Schema<IUser>(
    {
        _id: { type: String, id: false, required: true },
        username: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        followerIds: [{ type: String, required: false, ref: 'User' }],
        followingIds: [{ type: String, required: false, ref: 'User' }],
        tweetIds: [{ type: String, required: false, ref: 'Tweet' }],
        replyIds: [{ type: String, required: false, ref: 'Reply' }],
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

export const UserSchema = model<IUser>('User', schema);
