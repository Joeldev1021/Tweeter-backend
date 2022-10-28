import { LeanDocument, Types } from "mongoose";

export interface ITweet extends Document {
    _id: string;
    tweet: string;
    ownerId: string;
    image?: string;
    likes?: string[];
}

export interface ITweetDoc extends LeanDocument<ITweet> { }
