import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

const schema = new Schema<IUser>({
    _id: { type: String, _id: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tweet: [{ type: String }]
}, {
    versionKey: false
})


export const UserSchema = model<IUser>('User', schema)


