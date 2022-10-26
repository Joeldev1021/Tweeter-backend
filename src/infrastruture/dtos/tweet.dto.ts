import { Type, type Static } from '@sinclair/typebox'

const Tweet = Type.Object(
    {
        id: Type.String(),
        tweet: Type.String()
    }, {
    additionalProperties: false
}
)

export type TweetDtoType = Static<typeof Tweet>;

