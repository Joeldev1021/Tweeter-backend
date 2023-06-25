import { VOFormatException } from '../errors/VOFormatException';
import { ValueObject } from './Value0bject';

export class CreatedAtVO extends ValueObject<Date> {
    public equals(valueObject: CreatedAtVO): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: Date): void {
        if (value.getTime() > new Date().getTime()) {
            throw new VOFormatException(
                CreatedAtVO.name,
                JSON.stringify(value)
            );
        }
    }
}
