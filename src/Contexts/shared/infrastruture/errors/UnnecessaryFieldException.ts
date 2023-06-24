import { InfrastructureFormatException } from './infrastruture.format.exception';

export class UnnecessaryFieldsException extends InfrastructureFormatException {
    constructor() {
        super('unnecessary fields ');
    }
}
