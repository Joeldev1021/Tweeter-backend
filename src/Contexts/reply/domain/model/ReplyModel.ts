import { ReplyCreatedEvent } from '../../../shared/domain/events/reply/reply.created.event';
import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { ContentVO } from '../../../shared/domain/valueObjects/ContentValueObject';
import { CreatedAtVO } from '../../../shared/domain/valueObjects/CreatedAtVO';
import { UuidVO } from '../../../shared/domain/valueObjects/Uuid';
import { IOwnerDataVO } from '../../../shared/infrastruture/types';

export class ReplyModel extends AggregateRoot {
    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {UuidVO} tweetId - UuidVO
     * @param {ContentVO} content - ContentVO
     * @param {userId} userId - UuidVO
     */
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public tweetId: UuidVO,
        public userId: UuidVO,
        public parentReply: UuidVO | null,
        public likes: UuidVO[],
        public replyIds: UuidVO[],
        public createdAt: CreatedAtVO
    ) {
        super();
    }

    static create(
        id: UuidVO,
        content: ContentVO,
        tweeId: UuidVO,
        userId: UuidVO
    ): ReplyModel {
        const reply = new ReplyModel(
            id,
            content,
            tweeId,
            userId,
            null,
            [],
            [],
            new CreatedAtVO(new Date())
        );

        reply.record(
            new ReplyCreatedEvent({
                userId: userId.value,
                replyId: id.value,
                tweetId: tweeId.value,
            })
        );
        return reply;
    }

    addReplyId(replyId: UuidVO) {
        this.replyIds.push(replyId);
    }
}

export class ReplyWithUserModel {
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public tweetId: UuidVO,
        public likes: UuidVO[],
        public userId: IOwnerDataVO,
        public createdAt: CreatedAtVO
    ) {}
}
