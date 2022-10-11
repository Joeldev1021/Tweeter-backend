import { ApplicationException } from "./application.exception";

export class UserIdAlreadyExists extends ApplicationException {
    constructor() {
        super('user already exists')
    }
}