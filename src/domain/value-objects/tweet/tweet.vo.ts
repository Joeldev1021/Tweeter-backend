import { VOFormatException } from "../../errors/vo.format.exception";
import { ValueObject } from "../value-object";

export class TweetVO extends ValueObject<string> {

    public equals(valueObject: TweetVO): boolean {
        return this.value === valueObject.value;
    }
    public assertIsValid(value: string) {
        if (value.length < 3) throw new VOFormatException(TweetVO.name, value)
    }
}
