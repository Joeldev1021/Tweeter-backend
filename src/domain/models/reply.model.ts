import { ReplyVO } from "../value-objects/tweet/reply.vo";
import { UuidVO } from "../value-objects/uuid.vo";

export class ReplyModel {

    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {UuidVO} tweetId - UuidVO
     * @param {ReplyVO} reply - TweetVO 
     * @param {ownerId} ownerId - UuidVO
     */
    constructor(
        public readonly id: UuidVO,
        public tweetId: UuidVO,
        public reply: ReplyVO,
        public ownerId: UuidVO,
    ) { }


}

