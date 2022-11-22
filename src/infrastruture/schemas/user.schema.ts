import { Schema, model } from 'mongoose';
import { IUser } from '../types/schemas/user-doc.interface';

const schema = new Schema<IUser>({
    _id: { type: String, id: false, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    followersId: [{ type: String, required: false }]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    }
}
)


export const UserSchema = model<IUser>('User', schema)