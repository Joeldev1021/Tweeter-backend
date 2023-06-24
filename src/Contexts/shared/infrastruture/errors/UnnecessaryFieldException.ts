import { InfrastructureFormatException } from './infrastruture.format.exception';

export class UnnecessaryFieldsExceptions extends InfrastructureFormatException {
    constructor() {
        super('unnecessary fields ');
    }
}
