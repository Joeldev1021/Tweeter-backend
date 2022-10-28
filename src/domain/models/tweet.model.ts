import { TweetVO } from "../value-objects/tweet/tweet.vo";
import { UuidVO } from "../value-objects/uuid.vo";

export class TweetModel {

    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {TweetVO} tweet - TweetVO 
     * @param {ownerId} ownerId - UuidVO
     */
    constructor(
        public readonly id: UuidVO,
        public tweet: TweetVO,
        public ownerId: UuidVO,
    ) { }


}
