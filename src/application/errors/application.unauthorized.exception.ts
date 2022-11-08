import { ApplicationException } from "./application.exception";

export class AppplicationUnauthorizedException extends ApplicationException {
    constructor() {
        super("not authorized")
    }
}