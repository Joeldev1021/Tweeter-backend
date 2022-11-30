import { LeanDocument } from 'mongoose';
import { IUserDoc } from '../../../user/infrastructure/interface/user.interface';

export interface ITweet {
    _id: string;
    content: string;
    ownerId: string;
    image?: string;
    likes?: string[];
    replys?: string[];
    createdAt: Date;
}

export interface ITweetUser extends Omit<ITweet, 'ownerId'> {
    ownerId: IUserDoc;
}
export interface ITweetWithReplys extends Omit<ITweetUser, 'replys'> {
    replys: ITweetUser;
}

export interface ITweetDoc extends LeanDocument<ITweet> {}
