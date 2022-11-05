import { EmailVO } from "../value-objects/user/email.vo";
import { PasswordVO } from "../value-objects/user/password.vo";
import { UsernameVO } from "../value-objects/user/username.vo";
import { UuidVO } from "../value-objects/uuid.vo"

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
        public password: PasswordVO,
    ) { }

    static createUser(
        id: UuidVO,
        username: UsernameVO,
        email: EmailVO,
        password: PasswordVO
    ) {
        return new UserModel(id, username, email, password)
    }
}
