import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class InvalidLoginException extends ApplicationException {
  constructor() {
    super('invalid credentials');
  }
}
