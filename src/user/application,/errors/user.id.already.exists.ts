import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class UserIdAlreadyExistsException extends ApplicationException {
    constructor() {
        super('user id already exists');
    }
}
