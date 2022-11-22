import { QUERY_FILTER } from '@domain/constants'
import { validate } from 'uuid'
import { VOFormatException } from '../errors/vo.format.exception'
import { ValueObject } from './value-object'

export class QueryFilterVO extends ValueObject<string> {

    public equals(valueObject: QueryFilterVO) {
        return this.value === valueObject.value
    }

    protected assertIsValid(value: string): void {
        if (!Object.values(QUERY_FILTER).includes(value as QUERY_FILTER)) {
            throw new VOFormatException(QueryFilterVO.name, value)
        }
    }


}