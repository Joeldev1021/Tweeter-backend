import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { ImageVO } from '../../../shared/domain/value-objects/image.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { OwnerData } from '../../../shared/infrastruture/types';

export class TweetModel {
    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {ContentVO} content - ContentVO
     * @param {ownerId} ownerId - UuidVO
     * @param {ImageVO} image - ImageVO
     */
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public ownerId: UuidVO,
        public image: ImageVO | null,
        public likes: UuidVO[] | [],
        public reply: UuidVO[] | [],
        public createdAt: CreatedAtVO
    ) {}
}

export class TweetWithUserModel {
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public image: ImageVO | null,
        public Reply: UuidVO[] | [],
        public likes: UuidVO[],
        public createdAt: CreatedAtVO,
        public ownerId: OwnerData
    ) {}
}
