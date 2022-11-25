import { ApplicationException } from './application.exception';
export class UserEmailAlreadyExistsException extends ApplicationException {
  constructor() {
    super('email already exists');
  }
}
