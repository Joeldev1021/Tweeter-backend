import { EmailVO } from "../value-objects/emial.vo";
import { PasswordVO } from "../value-objects/password.vo";
import { UsernameVO } from "../value-objects/username.vo";
import { UuidVO } from "../value-objects/uuid.vo"

export class UserModel {

    constructor(
        public readonly id: UuidVO,
        public username: UsernameVO,
        public email: EmailVO,
        public password: PasswordVO,
    ) { }

    static createUser() {

    }
}
