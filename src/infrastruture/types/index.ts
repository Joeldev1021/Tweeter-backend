import { Request } from "express";


export interface UserRequest<T> extends Request {
    body: T
    userId: string
}

export interface AuthRequest<T> extends Request {
    userId: string;
}

export interface TweetRequest<T> extends Request {
    body: T,
    userId: string;
}

export type JwtPayload = {
    id: string
}

