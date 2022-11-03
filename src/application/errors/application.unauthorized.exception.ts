import { ApplicationException } from "./application.exception";

export class AppplicationUnauthorized extends ApplicationException {
    constructor() {
        super("not authorized")
    }
}