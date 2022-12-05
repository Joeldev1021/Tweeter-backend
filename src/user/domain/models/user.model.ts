import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { EmailVO } from '../value-objects/email.vo';
import { PasswordVO } from '../value-objects/password.vo';
import { UsernameVO } from '../value-objects/username.vo';

export class UserModel {
    /**
     * The constructor function is a public function that takes in an id, username, email, and password,
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {UsernameVO} username - UsernameVO
     * @param {EmailVO} email - EmailVO
     * @param {PasswordVO} password - PasswordVO
     */
    constructor(
        public readonly id: UuidVO,
        public username: UsernameVO,
        public email: EmailVO,
        public password: PasswordVO, //public followers: UuidVO[] | null
        public tweetIds: UuidVO[]
    ) {}

    static createUser(
        id: UuidVO,
        username: UsernameVO,
        email: EmailVO,
        password: PasswordVO,
        tweetIds: UuidVO[]
        //followers: UuidVO[] | null
    ) {
        return new UserModel(id, username, email, password, []);
    }

    public addTweet(tweetId: UuidVO) {
        this.tweetIds.push(tweetId);
    }
}
