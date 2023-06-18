import { ValueObject } from '../../../shared/domain/value-objects/Value0bject';
import { VOFormatException } from '../../../shared/domain/errors/vo.format.exception';

export class UserUsername extends ValueObject<string> {
    public equals(valueObject: UserUsername): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (value.length < 3)
            throw new VOFormatException(UserUsername.name, value);
    }
}
