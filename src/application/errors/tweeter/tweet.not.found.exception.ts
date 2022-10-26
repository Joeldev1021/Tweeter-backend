import { ApplicationException } from "../application.exception";

export class TweetNotFound extends ApplicationException {
    constructor() {
        super("tweet not found")
    }
}