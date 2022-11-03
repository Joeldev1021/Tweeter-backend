import { FORMAT_IMAGE } from "../../constants";
import { VOFormatException } from "../../errors/vo.format.exception";
import { ValueObject } from "../value-object";

export class ImageVO extends ValueObject<string> {

    public equals(valueObject: ImageVO): boolean {
        return this.value === valueObject.value;
    }
    public assertIsValid(value: FORMAT_IMAGE) {
        Object.values(FORMAT_IMAGE).includes(value)
    }
}

