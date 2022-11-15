import { randUuid, randUserName, randEmail, randPassword, randParagraph } from '@ngneat/falso'

export const generateRandomUser = () => ({
    id: randUuid(),
    username: randUserName(),
    email: randEmail(),
    password: randPassword({ size: 15 }),
});

export const generateTweetRandom = () => ({
    id: randUuid(),
    content: randParagraph()
})