import bcrypt from 'bcrypt';
import { ValueObject } from '../../../shared/domain/value-objects/Value0bject';
import { VOFormatException } from '../../../shared/domain/errors/vo.format.exception';

export class UserPassword extends ValueObject<string> {
    public equals(valueObject: UserPassword): boolean {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string): void {
        if (value.length < 5)
            throw new VOFormatException(UserPassword.name, value);
    }

    static async create(passwordPlain: string): Promise<UserPassword> {
        const passwordHash = await bcrypt.hash(passwordPlain, 10);
        return new UserPassword(passwordHash);
    }

    public async compare(passwordPlain: UserPassword): Promise<Boolean> {
        return await bcrypt.compare(passwordPlain.value, this.value);
    }
}
