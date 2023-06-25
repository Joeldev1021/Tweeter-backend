import { validate } from 'uuid';
import { VOFormatException } from '../errors/VOFormatException';
import { ValueObject } from './Value0bject';

export class Uuid extends ValueObject<string> {
    public equals(valueObject: Uuid): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (!validate(value)) {
            throw new VOFormatException(Uuid.name, value);
        }
    }
}
