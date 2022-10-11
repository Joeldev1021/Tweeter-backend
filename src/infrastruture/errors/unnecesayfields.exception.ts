import { InfrastructureExcepion } from "./infrastruture.exception";

export class UnnecesayFieldsExceptions extends InfrastructureExcepion {
    constructor() {
        super("unnecesary fields ")
    }
}