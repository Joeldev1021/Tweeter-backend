
export interface IReply {
    _id: string;
    reply: string;
    tweetId: string;
    ownerId: string;
    image?: string;
    likes?: Array<string>
    replyId?: Array<string>
}

