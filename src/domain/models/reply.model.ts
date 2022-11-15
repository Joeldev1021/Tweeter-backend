import { ContentVO } from "../value-objects/tweet/content.vo";
import { UuidVO } from "../value-objects/uuid.vo";

export class ReplyModel {

    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {UuidVO} tweetId - UuidVO
     * @param {ReplyVO} reply - ContentVO 
     * @param {ownerId} ownerId - UuidVO
     */
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public tweetId: UuidVO,
        public ownerId: UuidVO,
    ) { }


}

