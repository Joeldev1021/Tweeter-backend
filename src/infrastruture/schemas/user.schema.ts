import { Schema, model, type Model } from 'mongoose';
import { IUserDoc } from '../types/schemas/user-doc.interface';

const schema = new Schema({
    _id: { type: String, id: false, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})


export const UserSchema: Model<IUserDoc> = model('User', schema)