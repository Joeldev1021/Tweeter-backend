export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    tweet?: string;
    created_at?: string;
    updated_at?: string;
}