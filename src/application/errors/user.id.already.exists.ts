import { ApplicationException } from './application.exception';

export class UserIdAlreadyExistsException extends ApplicationException {
  constructor() {
    super('user id already exists');
  }
}
