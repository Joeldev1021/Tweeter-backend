import { VOFormatException } from '../../../shared/domain/errors/VOFormatException';
import { ValueObject } from '../../../shared/domain/valueObjects/Value0bject';

export class UserUsername extends ValueObject<string> {
    public equals(valueObject: UserUsername): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (value.length < 3)
            throw new VOFormatException(UserUsername.name, value);
    }
}
