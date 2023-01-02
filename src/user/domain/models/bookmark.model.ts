import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

export class BookMarkModel extends AggregateRoot {
    constructor(
        public readonly id: UuidVO,
        public ownerId: UuidVO,
        public tweetIds: UuidVO[],
        public replyIds: UuidVO[]
    ) {
        super();
    }

    static createBookMark(
        id: UuidVO,
        ownerId: UuidVO,
        tweetIds: UuidVO[],
        replyIds: UuidVO[]
    ): BookMarkModel {
        return new BookMarkModel(id, ownerId, tweetIds, replyIds);
    }
}
