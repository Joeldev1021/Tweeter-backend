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

    describe('Save Tweet and Reply Bookmark ', () => {
        const reply = generateTweetRandom();

        it('should save a tweet into bookmark successfully', async () => {
            await api
                .post(`/bookmark/save/${tweet.id}`)
                .set('Authorization', token)
                .expect(200);
        });

        it('should save a reply into bookmark successfully', async () => {
            /* create first reply */
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);
            /* save reply into the bookmark */
            await api
                .post(`/bookmark/save/${reply.id}`)
                .set('Authorization', token)
                .expect(200);
        });
    });

    describe('remove Tweet and Reply bookmark', () => {
        beforeEach(async () => {
            await api
                .post(`/bookmark/save/${tweet.id}`)
                .set('Authorization', token);
        });
        it('should remove tweet the bookmark', async () => {
            await api
                .post(`/bookmark/remove/${tweet.id}`)
                .set('Authorization', token)
                .expect(204);
        });
        it('should remove reply the bookmark', async () => {
            const reply = generateTweetRandom();
            /*  create reply  */
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);
            /* save reply */
            await api
                .post(`/bookmark/save/${reply.id}`)
                .set('Authorization', token);

            /* remove reply */
            await api
                .post(`/bookmark/remove/${reply.id}`)
                .set('Authorization', token)
                .expect(204);
        });
    });
});
