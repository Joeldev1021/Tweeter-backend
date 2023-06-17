import { ApplicationException } from '../../../shared/application/errors/application.exception';

export class BookMarkNotFoundException extends ApplicationException {
    constructor() {
        super('Bookmark not found');
    }
}
