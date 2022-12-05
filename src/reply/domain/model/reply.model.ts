import { ReplyCreatedEvent } from '../../../shared/domain/events/reply/reply.created.event';
import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { IOwnerDataVO } from '../../../shared/infrastruture/types';

export class ReplyModel extends AggregateRoot {
    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {UuidVO} tweetId - UuidVO
     * @param {ContentVO} content - ContentVO
     * @param {ownerId} ownerId - UuidVO
     */
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public tweetId: UuidVO,
        public ownerId: UuidVO,
        public parentReply: UuidVO | null,
        public likes: UuidVO[],
        public replysId: UuidVO[],
        public createdAt: CreatedAtVO
    ) {
        super();
    }

    static create(
        id: UuidVO,
        content: ContentVO,
        tweeId: UuidVO,
        ownerId: UuidVO
    ): ReplyModel {
        const reply = new ReplyModel(
            id,
            content,
            tweeId,
            ownerId,
            null,
            [],
            [],
            new CreatedAtVO(new Date())
        );

        reply.apply(
            new ReplyCreatedEvent({
                ownerId: ownerId.value,
                replyId: id.value,
                tweetId: tweeId.value,
            })
        );
        return reply;
    }
    addReplyId(replyId: UuidVO) {
        this.replysId.push(replyId);
    }
}

export class ReplyWithUserModel {
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public tweetId: UuidVO,
        public likes: UuidVO[] | [],
        public ownerId: IOwnerDataVO,
        public createdAt: CreatedAtVO
    ) {}
}
