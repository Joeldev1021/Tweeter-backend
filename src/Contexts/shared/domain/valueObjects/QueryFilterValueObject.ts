import { QUERY_FILTER } from '../constants';
import { VOFormatException } from '../errors/vo.format.exception';
import { ValueObject } from './Value0bject';

export class QueryFilterValueObject extends ValueObject<string> {
    public equals(valueObject: QueryFilterValueObject): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (!Object.values(QUERY_FILTER).includes(value as QUERY_FILTER)) {
            throw new VOFormatException(QueryFilterValueObject.name, value);
        }
    }
}
