import { ApplicationException } from "../application.exception";

export class TweetIdAlreadyExist extends ApplicationException {
    constructor() {
        super("tweet with id already exists")
    }
}