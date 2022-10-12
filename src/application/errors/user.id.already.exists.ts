import { ApplicationException } from "./application.exception";

export class UserIdAlreadyExists extends ApplicationException {
    constructor() {
        super('user id already exists')
    }
}