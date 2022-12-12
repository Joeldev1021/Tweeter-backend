import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { IOwnerDataVO } from '../../../shared/infrastruture/types';

export class ReplyModel {
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
        public replyIds: UuidVO[],
        public createdAt: CreatedAtVO
    ) {}
}

export class ReplyWithUserModel {
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public tweetId: UuidVO,
        public likes: UuidVO[],
        public ownerId: IOwnerDataVO,
        public createdAt: CreatedAtVO
    ) {}
}
