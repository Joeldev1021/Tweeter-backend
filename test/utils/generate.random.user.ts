import { randUuid, randUserName, randEmail, randPassword } from '@ngneat/falso'

export const generateRandomUser = () => ({
    id: randUuid(),
    username: randUserName(),
    email: randEmail(),
    password: randPassword({ size: 15 }),
});