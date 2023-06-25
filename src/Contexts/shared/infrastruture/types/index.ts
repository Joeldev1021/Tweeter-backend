import { UsernameVO } from '../../../user/domain/value-objects/UserUsername';
import { UuidVO } from '../../domain/valueObjects/Uuid';
import { Request } from 'express';

export interface UserRequest<T> extends Request {
    body: T;
    userId: string;
}

export interface AuthRequest<T> extends Request {
    userId: string;
}

export interface TweetRequest<T> extends Request {
    body: T;
    userId: string;
}

export interface JwtPayload {
    id: string;
}

export interface IOwnerDataVO {
    id: UuidVO;
    username: UsernameVO;
    avatar: string;
}

export interface IOwnerData {
    id: string;
    username: string;
    avatar: string;
}
