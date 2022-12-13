import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

const schema = new Schema<IUser>(
    {
        _id: { type: String, id: false, required: true },
        username: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        followerIds: [{ type: String, required: false }],
        followingIds: [{ type: String, required: false }],
        tweetIds: [{ type: String, required: false }],
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
