import { ApplicationException } from '../application.exception';

export class TweetNotFoundException extends ApplicationException {
  constructor() {
    super('tweet not found');
  }
}
