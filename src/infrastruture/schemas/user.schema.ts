import { Schema, model, type Model } from 'mongoose';
import { ITweetDoc } from '../types/schemas/tweeter-doc.interface';
import { IUser, IUserDoc } from '../types/schemas/user-doc.interface';

const schema = new Schema<IUser>({
    _id: { type: String, id: false, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    followersId: [{ type: String, required: false }]
})


export const UserSchema = model<IUser>('User', schema)