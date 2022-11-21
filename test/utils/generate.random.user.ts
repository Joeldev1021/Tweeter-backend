import { randUuid, randUserName, randEmail, randPassword, randParagraph, randFirstName } from '@ngneat/falso'


export const generateRandomUser = () => ({
    id: randUuid(),
    username: randFirstName(),
    email: randEmail(),
    password: randPassword({ size: 15 }),
});

export const generateTweetRandom = () => ({
    id: randUuid(),
    content: randParagraph()
})