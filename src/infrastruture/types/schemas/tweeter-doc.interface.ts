import { LeanDocument, Types } from "mongoose";

export interface ITweet extends Document {
    _id: string;
    tweet: string;
    image?: string;
    ownerId: string;
    likes?: string[];
}

export interface ITweetDoc extends LeanDocument<ITweet> { }
