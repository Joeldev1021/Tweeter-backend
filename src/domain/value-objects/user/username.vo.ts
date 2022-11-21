import { VOFormatException } from "../../errors/vo.format.exception";
import { ValueObject } from "../value-object";

export class UsernameVO extends ValueObject<string>{

    public equals(valueObject: UsernameVO): boolean {
        return this.value === valueObject.value
    }

    protected assertIsValid(value: string) {
        if (value.length < 3) throw new VOFormatException(UsernameVO.name, value)
    }
}