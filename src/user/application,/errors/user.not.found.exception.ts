import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class UserNotFoundException extends ApplicationException {
    constructor() {
        super('user not found');
    }
}
