import { ApplicationException } from "./application.exception";

export class InvalidLoginexception extends ApplicationException {
    constructor() {
        super("invalid credentials")
    }
}