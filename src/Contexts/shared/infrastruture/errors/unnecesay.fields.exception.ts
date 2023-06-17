import { InfrastructureFormatException } from './infrastruture.format.exception';

export class UnnecesayFieldsExceptions extends InfrastructureFormatException {
    constructor() {
        super('unnecesary fields ');
    }
}
