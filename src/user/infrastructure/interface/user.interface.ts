import type { LeanDocument } from 'mongoose';

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    followersId?: string[];
}

export interface IUserDoc extends LeanDocument<IUser> {}
