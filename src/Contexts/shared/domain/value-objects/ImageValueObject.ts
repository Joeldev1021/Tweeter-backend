import { ValueObject } from './Value0bject';
import { FORMAT_IMAGE } from '../constants';

export class ImageValueObject extends ValueObject<string> {
    public equals(valueObject: ImageValueObject): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: FORMAT_IMAGE): void {
        Object.values(FORMAT_IMAGE).includes(value);
    }
}
