import type { LeanDocument } from 'mongoose';

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    followerIds?: string[];
    followingIds?: string[];
    tweetIds?: string[];
    replyIds?: string[];
}

export interface IUserDoc extends LeanDocument<IUser> {}
