import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { EmailVO } from '../value-objects/email.vo';
import { PasswordVO } from '../value-objects/password.vo';
import { UsernameVO } from '../value-objects/username.vo';

export class UserModel extends AggregateRoot {
    /**
     * The constructor function takes in a bunch of values, and assigns them to the class properties
     * @param {UuidVO} id - UuidVO - The user's unique id
     * @param {UsernameVO} username - UsernameVO
     * @param {EmailVO} email - EmailVO
     * @param {PasswordVO} password - PasswordVO,
     * @param {UuidVO[]} tweetIds - An array of UuidVO's that represent the tweets that this user has
     * posted.
     * @param {UuidVO[]} replyIds - UuidVO[] - This is an array of UuidVO's that represent the replies
     * that this user has made.
     * @param {UuidVO[]} followerIds - UuidVO[]
     * @param {UuidVO[]} followingIds - UuidVO[]
     */
    constructor(
        public readonly id: UuidVO,
        public username: UsernameVO,
        public email: EmailVO,
        public password: PasswordVO, //public followers: UuidVO[] | null
        public tweetIds: UuidVO[],
        public replyIds: UuidVO[],
        public followerIds: UuidVO[],
        public followingIds: UuidVO[]
    ) {
        super();
    }

    static createUser(
        id: UuidVO,
        username: UsernameVO,
        email: EmailVO,
        password: PasswordVO,
        tweetIds: UuidVO[],
        followerIds: UuidVO[],
        followingIds: UuidVO[]
    ) {
        return new UserModel(id, username, email, password, [], [], [], []);
    }

    public addTweet(tweetId: UuidVO) {
        this.tweetIds.push(tweetId);
    }

    public addReply(replyId: UuidVO) {
        this.replyIds.push(replyId);
    }
}
