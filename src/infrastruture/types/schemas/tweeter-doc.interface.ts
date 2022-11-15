import { Document, LeanDocument, Types } from "mongoose";

export interface ITweet {
    _id: string;
    content: string;
    ownerId: string;
    image?: string;
    likes?: string[]
    reply?: string[]
    createdAt: Date;
}

export interface ITweetDoc extends LeanDocument<ITweet> { }
