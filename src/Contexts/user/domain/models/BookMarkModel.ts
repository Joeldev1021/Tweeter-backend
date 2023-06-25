import { AggregateRoot } from '../../../shared/domain/models/AggregateRoot';
import { UserId } from '../../../shared/domain/valueObjects/UserId';
import { BookMarkId } from '../value-objects/BookMarkId';

export class BookMarkModel extends AggregateRoot {
    constructor(
        public readonly id: BookMarkId,
        public userId: UserId,
        public tweetIds: TweetId[],
        public replyIds: ReplyId[]
    ) {
        super();
    }

    static createBookMark(
        id: BookMarkId,
        userId: UserId,
        tweetIds: TweetId[],
        replyIds: Reply[]
    ): BookMarkModel {
        return new BookMarkModel(id, userId, tweetIds, replyIds);
    }
}
