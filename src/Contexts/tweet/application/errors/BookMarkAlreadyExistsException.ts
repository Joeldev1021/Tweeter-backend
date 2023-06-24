import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class BookMarkAlreadyExistException extends ApplicationException {
    constructor() {
        super('Bookmark with id already exists');
    }
}
