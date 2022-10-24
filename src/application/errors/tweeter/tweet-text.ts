import { ApplicationException } from "../application.exception";

export class TweetTextException extends ApplicationException {
    constructor() {
        super("tweet text not content")
    }
}