import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class TweetAlreadyExist extends ApplicationException {
  constructor() {
    super('tweet with id already exists');
  }
}
