import { Type, type Static } from '@sinclair/typebox'

const Reply = Type.Object(
    {
        id: Type.String(),
        reply: Type.String()
    }, {
    additionalProperties: false
}
)

export type ReplyDtoType = Static<typeof Reply>;

