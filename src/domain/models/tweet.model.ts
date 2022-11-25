import { UsernameVO } from "../../domain/value-objects/user/username.vo";
import { CreatedAtVO } from "../value-objects/created-at.vo";
import { ContentVO } from "../value-objects/tweet/content.vo";
import { ImageVO } from "../value-objects/tweet/image.vo";
import { UuidVO } from "../value-objects/uuid.vo";

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
    ) {
    }
}

interface OwnerData {
    id: UuidVO;
    username: UsernameVO;
    avatar: string;
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
    ) {
    }
}
