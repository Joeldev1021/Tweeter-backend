import { ApplicationException } from "./application.exception";

export class UserEmailAlreadyExists extends ApplicationException {
    constructor() {
        super('email already exists')
    }
}