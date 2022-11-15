import { Type, type Static } from '@sinclair/typebox'

const Reply = Type.Object(
    {
        id: Type.String(),
        content: Type.String()
    }, {
    additionalProperties: false
}
)

export type ReplyDtoType = Static<typeof Reply>;

