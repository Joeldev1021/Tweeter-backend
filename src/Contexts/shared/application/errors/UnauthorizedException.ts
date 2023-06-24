import { ApplicationException } from './application.exception';

export class ApplicationUnauthorizedException extends ApplicationException {
    constructor() {
        super('not authorized');
    }
}
