import bcrypt from 'bcrypt';
import { ValueObject } from '../../../shared/domain/value-objects/value-object';
import { VOFormatException } from '../../../shared/domain/errors/vo.format.exception';

export class PasswordVO extends ValueObject<string> {
  public equals(valueObject: PasswordVO): boolean {
    return this.value === valueObject.value;
  }

  protected assertIsValid(value: string) {
    if (value.length < 5) throw new VOFormatException(PasswordVO.name, value);
  }

  static async create(passwordPlain: string) {
    const passwordHash = await bcrypt.hash(passwordPlain, 10);
    return new PasswordVO(passwordHash);
  }
  public async compare(passwordPlain: PasswordVO) {
    return bcrypt.compare(passwordPlain.value, this.value);
  }
}
