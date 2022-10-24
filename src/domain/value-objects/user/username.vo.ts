import { VOFormatException } from "../../errors/vo.format.exception";
import { ValueObject } from "../value-object";

export class UsernameVO extends ValueObject<string>{

    public equals(valueObject: UsernameVO): boolean {
        return this.value === valueObject.value
    }

    public assertIsValid(value: string) {
        if (value.length < 5) throw new VOFormatException(UsernameVO.name, value)
    }
}