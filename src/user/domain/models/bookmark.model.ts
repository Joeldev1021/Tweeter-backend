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

    static createUser(
        id: UuidVO,
        ownerId: UuidVO,
        tweetIds: UuidVO[],
        replyIds: UuidVO[]
    ) {
        return new BookMarkModel(id, ownerId, tweetIds, replyIds);
    }
}
