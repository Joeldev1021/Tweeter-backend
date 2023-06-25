import type { LeanDocument } from 'mongoose';
import { IUserDoc } from '../../../user/infrastructure/interface/IUser';

export interface IReply {
    _id: string;
    content: string;
    tweetId: string;
    userId: string;
    image?: string;
    likes?: string[];
    replyIds?: string[]; //replys id
    parentReplyId?: string; // parent reply
    createdAt: Date;
}

export interface IReplyUser extends Omit<IReply, 'userId'> {
    userId: IUserDoc;
}

export interface IReplyDoc extends LeanDocument<IReply> {}
