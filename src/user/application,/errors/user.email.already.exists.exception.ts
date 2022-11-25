import { ApplicationException } from '../../../shared/application/errors/application.exception';
export class UserEmailAlreadyExistsException extends ApplicationException {
  constructor() {
    super('email already exists');
  }
}
