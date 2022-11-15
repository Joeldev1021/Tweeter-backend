import { isEmail } from "class-validator";
import { VOFormatException } from "../../errors/vo.format.exception";
import { ValueObject } from "../value-object";

export class EmailVO extends ValueObject<string>{

    public equals(valueObject: EmailVO): boolean {
        return this.value === valueObject.value
    }

    protected assertIsValid(value: string) {
        if (!isEmail(value)) throw new VOFormatException(EmailVO.name, value)
    }

} 