import { VOFormatException } from '../errors/VOFormatException';
import { ValueObject } from './Value0bject';

export class ContentValueObject extends ValueObject<string> {
    public equals(valueObject: ContentValueObject): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (value.length < 1)
            throw new VOFormatException(ContentValueObject.name, value);
    }
}
