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
    ownerId: {
        id: string;
        username: string;
        avatar: string;
    };
}

export interface ITweetWithReplys extends Omit<ITweetUser, 'reply'> {
    reply: ITweetUser;
}
