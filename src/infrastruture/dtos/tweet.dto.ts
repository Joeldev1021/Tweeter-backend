import { Type, type Static } from '@sinclair/typebox'

const Tweet = Type.Object(
    {
        _id: Type.String(),
        tweet: Type.String()
    }, {
    additionalProperties: false
}
)

export type TweetDtoType = Static<typeof Tweet>;

