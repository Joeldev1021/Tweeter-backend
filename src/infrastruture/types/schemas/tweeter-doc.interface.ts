import { Document, LeanDocument, Types } from "mongoose";

export interface ITweet {
    _id: string;
    tweet: string;
    ownerId: string;
    image?: string;
    likes?: string[]
    reply?: string[]
}

export interface ITweetDoc extends LeanDocument<ITweet> { }
