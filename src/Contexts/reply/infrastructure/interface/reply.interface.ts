import type { LeanDocument } from 'mongoose';
import { IUserDoc } from '../../../user/infrastructure/interface/IUser';

export interface IReply {
    _id: string;
    content: string;
    tweetId: string;
    ownerId: string;
    image?: string;
    likes?: Array<string>;
    replyIds?: Array<string>; //replys id
    parentReplyId?: string; // parent reply
    createdAt: Date;
}

export interface IReplyUser extends Omit<IReply, 'ownerId'> {
    ownerId: IUserDoc;
}

export interface IReplyDoc extends LeanDocument<IReply> {}
