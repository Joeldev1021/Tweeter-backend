import { InfrastructureFormatException } from './infrastruture.format.exception';

export class MissingFieldException extends InfrastructureFormatException {
    constructor() {
        super('missing field required');
    }
}
