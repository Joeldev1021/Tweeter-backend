import { Type, type Static } from '@sinclair/typebox'

export const UserRegisterDto = Type.Object(
    {
        _id: Type.String(),
        username: Type.String(),
        email: Type.String(),
        password: Type.String(),
    }, {
    additionalProperties: false
}
)

export type UserRegistertDtoType = Static<typeof UserRegisterDto>;