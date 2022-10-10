import { DomainFormatException } from "./domain.format.exception";

export class VOFormatException extends DomainFormatException {
    constructor(constructorName: string, value: string) {
        super(`${constructorName}: invalid value ${value}`)
    }
}