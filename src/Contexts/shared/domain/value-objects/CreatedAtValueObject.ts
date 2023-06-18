import { VOFormatException } from '../errors/vo.format.exception';
import { ValueObject } from './Value0bject';

export class CreatedAtValueObject extends ValueObject<Date> {
    public equals(valueObject: CreatedAtValueObject): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: Date): void {
        if (value.getTime() > new Date().getTime()) {
            throw new VOFormatException(
                CreatedAtValueObject.name,
                JSON.stringify(value)
            );
        }
    }
}
