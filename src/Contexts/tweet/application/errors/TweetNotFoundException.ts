import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class TweetNotFoundException extends ApplicationException {
  constructor() {
    super('tweet not found');
  }
}
