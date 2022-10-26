import { ApplicationException } from "./application.exception";

export class UserNotFoundException extends ApplicationException {
    constructor() {
        super('user not found')
    }
}