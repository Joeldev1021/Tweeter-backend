
export interface IReply {
    _id: string;
    content: string;
    tweetId: string;
    ownerId: string;
    image?: string;
    likes?: Array<string>
    replyId?: Array<string>
}

