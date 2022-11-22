//TODO: refactor interface tweet with Replys 

interface IOnwer {
    username: string;
    avatar: string;
}
export interface ITweet {
    _id: string;
    content: string;
    ownerId: string;
    image?: string;
    likes?: string[]
    reply?: string[]
    createdAt: Date;
}

export interface ITweetUser {
    _id: string;
    content: string;
    ownerId: IOnwer;
    image?: string;
    likes?: string[]
    reply?: string[]
    createdAt: Date;
}

interface ReplyUser {
    _id: string;
    content: string;
    ownerId: IOnwer;
    image?: string;
    likes?: string[]
    createdAt: Date;
    replyId: string[]
}

export interface TweetWithReplys {
    _id: string;
    content: string;
    ownerId: string;
    image?: string;
    likes?: string;
    reply: ReplyUser
}
