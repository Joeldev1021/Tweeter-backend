import { Request } from "express";

export interface IUserRegister {
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string
}

export interface UserRequest<T> extends Request {
    body: T
}


