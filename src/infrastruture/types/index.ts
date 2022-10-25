import { Request } from "express";


export interface UserRequest<T> extends Request {
    body: T
}

export interface TweetRequest<T> extends Request {
    body: T
}

export type JwtPayload = {
    id: string
}
