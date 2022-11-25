import { ValueObject } from './value-object';
import { FORMAT_IMAGE } from '../constants';

export class ImageVO extends ValueObject<string> {
    public equals(valueObject: ImageVO): boolean {
        return this.value === valueObject.value;
    }
    protected assertIsValid(value: FORMAT_IMAGE) {
        Object.values(FORMAT_IMAGE).includes(value);
    }
}
