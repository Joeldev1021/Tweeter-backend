import { isEmail } from 'class-validator';
import { ValueObject } from '../../../shared/domain/value-objects/value-object';
import { VOFormatException } from '../../../shared/domain/errors/vo.format.exception';

export class EmailVO extends ValueObject<string> {
  public equals(valueObject: EmailVO): boolean {
    return this.value === valueObject.value;
  }

  protected assertIsValid(value: string) {
    if (!isEmail(value)) throw new VOFormatException(EmailVO.name, value);
  }
}
