import { ApplicationException } from './application.exception';

export class InvalidLoginException extends ApplicationException {
  constructor() {
    super('invalid credentials');
  }
}
