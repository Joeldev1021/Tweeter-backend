import { InfrastructureFormatException } from './infrastruture.format.exception';

export class InfrastructureUnauthorizedException extends InfrastructureFormatException {
    constructor() {
        super('not authorized');
    }
}
