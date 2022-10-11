import { Schema, model } from 'mongoose';

const schema = new Schema({
    _id: { type: String, _id: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tweet: { type: String }
})


export const UserSchema = model('User', schema)


