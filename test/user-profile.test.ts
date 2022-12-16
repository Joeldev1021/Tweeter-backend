import {
    generateRandomUser,
    generateTweetRandom,
} from './utils/generate.random.user';
import { api } from './user-register.test';

describe('test for profile user', () => {
    let token: string;
    let userName: string;

    beforeEach(async () => {
        const userRegister = generateRandomUser();
        const { body } = await api
            .post('/auth/register')
            .send(userRegister)
            .expect(201);
        token = body.token;
        userName = userRegister.username;
    });

    describe('GET profile ', () => {
        let tweet = generateTweetRandom();
        beforeEach(async () => {
            for (let index = 0; index < 3; index++) {
                tweet = generateTweetRandom();
                await api
                    .post('/tweet')
                    .set('Authorization', token)
                    .send(tweet);
            }
        });

        test('find profile user successfully', async () => {
            await api
                .get(`/user/${userName}`)
                .set('Authorization', token)
                .expect(200);
        });

        test('find profile  tweet with reply successfully', async () => {
            const reply = generateRandomUser();

            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);
            await api
                .get(`/user/${userName}?query=reply`)
                .set('Authorization', token)
                .expect(200);
        });
    });
});
