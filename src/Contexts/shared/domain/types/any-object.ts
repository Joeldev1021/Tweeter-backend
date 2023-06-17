export interface IAny {
    [key: string]: any;
}

export type AnyObject<T = {}> = IAny & T;
