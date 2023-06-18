import { validate } from 'uuid';
import { VOFormatException } from '../errors/vo.format.exception';
import { ValueObject } from './Value0bject';

export class UuidValueObject extends ValueObject<string> {
    public equals(valueObject: UuidValueObject): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (!validate(value)) {
            throw new VOFormatException(UuidValueObject.name, value);
        }
    }
}
