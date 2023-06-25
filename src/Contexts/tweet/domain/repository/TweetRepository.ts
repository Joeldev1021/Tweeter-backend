import { Nullable } from '../../../shared/domain/valueObjects/Nullable';
import { UserId } from '../../../shared/domain/valueObjects/UserId';
import { TweetModel } from '../models/TweetModel';
import { TweetId } from '../valueObjects/TweetId';

export interface TweetRepository {
    save(tweet: TweetModel): Promise<void>;

    findById(id: TweetId): Promise<Nullable<TweetModel>>;

    findByUserId(userId: UserId): Promise<Nullable<TweetModel>>;

    findAll(): Promise<Nullable<TweetModel[]>>;

    update(id: TweetId, tweet: TweetModel): Promise<void>;

    delete(id: TweetId): Promise<void>;

    addLike(tweetId: TweetId, userId: UserId): Promise<void>;

    removeLike(tweetId: TweetId, userId: TweetId): Promise<void>;
}
