export abstract class ValueObject<T> {
    constructor(public readonly value: T) {
        this.assertIsValid(value)
    }

    protected abstract assertIsValid(value: T): void

    public abstract equals(valueObject: ValueObject<T>): boolean
}