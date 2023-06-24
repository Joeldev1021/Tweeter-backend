import { validate } from 'uuid';
import { VOFormatException } from '../errors/vo.format.exception';
import { ValueObject } from './ValueObject';

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
