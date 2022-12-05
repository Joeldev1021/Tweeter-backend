import { ValueObject } from '../../../shared/domain/value-objects/value-object';
import { VOFormatException } from '../../../shared/domain/errors/vo.format.exception';

export class UsernameVO extends ValueObject<string> {
  public equals(valueObject: UsernameVO): boolean {
    return this.value === valueObject.value;
  }

  protected assertIsValid(value: string) {
    if (value.length < 3) throw new VOFormatException(UsernameVO.name, value);
  }
}
