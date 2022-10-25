import { Type, type Static } from '@sinclair/typebox'

const UserLoginDto = Type.Object(
    {
        email: Type.String(),
        password: Type.String(),
    }, {
    additionalProperties: false
}
)

export type UserLogintDtoType = Static<typeof UserLoginDto>;
