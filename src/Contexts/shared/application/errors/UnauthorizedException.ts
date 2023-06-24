import { ApplicationException } from './application.exception';

export class UnauthorizedException extends ApplicationException {
    constructor() {
        super('not authorized');
    }
}
