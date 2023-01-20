import { api } from './user-register.test';
import {
    generateRandomUser,
    generateTweetRandom,
} from './utils/generate.random.user';

describe('TEST FOR BOOKMARK', () => {
    let token: string;
    let tweet: any;

    beforeEach(async () => {
        const userRegister = generateRandomUser();
        tweet = generateTweetRandom();
        const { body } = await api.post('/auth/register').send(userRegister);
        token = body.token;
        await api.post('/tweet').set('Authorization', token).send(tweet);
    });

    describe('Save Tweet Bookmark ', () => {
        it('should save tweet successfully', async () => {
            await api
                .post(`/bookmark/save/${tweet.id}`)
                .set('Authorization', token)
                .expect(204);
        });
        // it('unfollow successfully', async () => {});
    });
});
