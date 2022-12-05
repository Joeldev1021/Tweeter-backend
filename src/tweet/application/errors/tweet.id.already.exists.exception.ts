import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class TweetIdAlreadyExist extends ApplicationException {
  constructor() {
    super('tweet with id already exists');
  }
}
