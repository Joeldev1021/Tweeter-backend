import { isEmail } from 'class-validator';
import { ValueObject } from '../../../shared/domain/value-objects/Value0bject';
import { VOFormatException } from '../../../shared/domain/errors/vo.format.exception';

export class UserEmail extends ValueObject<string> {
    public equals(valueObject: UserEmail): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (!isEmail(value)) throw new VOFormatException(UserEmail.name, value);
    }
}
