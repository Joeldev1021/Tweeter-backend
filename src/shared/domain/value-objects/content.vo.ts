import { ValueObject } from './value-object';
import { VOFormatException } from '../errors/vo.format.exception';

export class ContentVO extends ValueObject<string> {
    public equals(valueObject: ContentVO): boolean {
        return this.value === valueObject.value;
    }
    protected assertIsValid(value: string) {
        if (value.length < 1)
            throw new VOFormatException(ContentVO.name, value);
    }
}
