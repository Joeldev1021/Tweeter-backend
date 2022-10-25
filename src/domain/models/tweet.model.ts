import { TweetVO } from "../value-objects/tweet/tweet.vo";
import { UuidVO } from "../value-objects/uuid.vo";

export class TweetModel {

    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {TweetVO} tweet- PasswordVO
     */
    constructor(
        public readonly id: UuidVO,
        public tweet: TweetVO,
    ) { }

    static createUser(
        id: UuidVO,
        tweet: TweetVO,
    ) {
        return new TweetModel(id, tweet)
    }
}
