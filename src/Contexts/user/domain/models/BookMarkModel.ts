import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { UserId } from '../../../shared/domain/value-objects/UserId';

export class BookMarkModel extends AggregateRoot {
    constructor(
        public readonly id: UuidVO,
        public ownerId: UserId,
        public tweetIds: UuidVO[],
        public replyIds: UuidVO[]
    ) {
        super();
    }

    static createBookMark(
        id: UuidVO,
        ownerId: UserId,
        tweetIds: UuidVO[],
        replyIds: UuidVO[]
    ): BookMarkModel {
        return new BookMarkModel(id, ownerId, tweetIds, replyIds);
    }
}
