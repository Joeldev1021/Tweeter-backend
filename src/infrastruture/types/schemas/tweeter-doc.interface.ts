//TODO: refactor interface tweet with Replys 
export interface ITweetSchema {
    _id: string;
    content: string;
    ownerId: string;
    image?: string;
    likes?: string[]
    reply?: string[]
    createdAt: Date;
}

export interface ITweetWithAuthor {
    _id: string;
    content: string;
    ownerId: {
        username: string;
        avatar: string;
    }
    image?: string;
    likes?: string[]
    reply?: string[]
    createdAt: Date;
}
interface ReplyUser {
    _id: string;
    username: string;
    content: string;
    image?: string;
    createdAt: Date;
    likes: string[]
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
