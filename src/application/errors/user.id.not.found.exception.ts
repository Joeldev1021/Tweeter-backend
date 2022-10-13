import { ApplicationException } from "./application.exception";

export class UserIdNotFoundException extends ApplicationException {
    constructor() {
        super('user id not found')
    }
}