import { VOFormatException } from "../../errors/vo.format.exception";
import { ValueObject } from "../value-object";

export class ReplyVO extends ValueObject<string> {

    public equals(valueObject: ReplyVO): boolean {
        return this.value === valueObject.value;
    }
    public assertIsValid(value: string) {
        if (value.length < 1) throw new VOFormatException(ReplyVO.name, value)
    }
}

