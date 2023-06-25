import type { LeanDocument } from 'mongoose';

export interface IBookMark {
    _id: string;
    userId: string;
    tweetIds?: string[];
    replyIds?: string[];
}

export interface IBookMarkDoc extends LeanDocument<IBookMark> {}
