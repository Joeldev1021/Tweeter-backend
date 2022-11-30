import type { LeanDocument } from 'mongoose';
import { IUserDoc } from '../../../user/infrastructure/interface/user.interface';

export interface IReply {
    _id: string;
    content: string;
    tweetId: string;
    ownerId: string | IUserDoc;
    image?: string;
    likes?: Array<string>;
    replyId?: Array<string>;
    createdAt: Date;
}

export interface IReplyUser extends Omit<IReply, 'ownerId'> {
    ownerId: IUserDoc;
    /* ownerId: {
        id: string;
        username: string;
        // avatar: string;
    }; */
}

export interface IReplyDoc extends LeanDocument<IReply> {}
