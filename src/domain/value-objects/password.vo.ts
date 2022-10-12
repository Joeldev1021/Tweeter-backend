import bcrypt from 'bcrypt'
import { VOFormatException } from "../errors/vo.format.exception";
import { ValueObject } from "./value-object";

export class PasswordVO extends ValueObject<string>{



    public equals(valueObject: PasswordVO): boolean {
        return this.value === valueObject.value
    }


    public assertIsValid(value: string) {
        if (value.length < 5) throw new VOFormatException(PasswordVO.name, value)
    }

    static async create(passwordPlain: string) {
        const passwordHash = await bcrypt.hash(passwordPlain, 10)
        return new PasswordVO(passwordHash)
    }
}