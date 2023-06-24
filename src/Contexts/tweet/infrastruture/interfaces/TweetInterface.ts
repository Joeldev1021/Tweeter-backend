import { LeanDocument } from 'mongoose';
import { IUserDoc } from '../../../user/infrastructure/interface/IUser';

export interface ITweet {
    _id: string;
    content: string;
    ownerId: string;
    image?: string;
    likes?: string[];
    replyIds?: string[];
    createdAt: Date;
}

export interface ITweetUser extends Omit<ITweet, 'ownerId'> {
    ownerId: IUserDoc;
}
export interface ITweetWithReply extends Omit<ITweetUser, 'replyIds'> {
    replyIds: ITweetUser;
}

export interface ITweetDoc extends LeanDocument<ITweet> {}
