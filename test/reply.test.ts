import { api } from './user-register.test';
import {
    generateRandomUser,
    generateTweetRandom,
} from './utils/generate.random.user';

describe('TEST FOR REPLY', () => {
    let token: string;
    let tweet = generateTweetRandom();
    let reply = generateTweetRandom();

    beforeEach(async () => {
        /* register user before test  */
        const userRegister = generateRandomUser();

        const { body } = await api.post('/auth/register').send(userRegister);
        token = body.token;
    });
    /* create tweet before test reply */
    beforeEach(async () => {
        await api.post('/tweet').set('Authorization', token).send(tweet);
    });

    describe('POST create reply test', () => {
        it('create reply successfully', async () => {
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply)
                .expect(201);
        });

        it('create reply failed - tweet not found ', async () => {
            const tweetFail = generateTweetRandom();

            await api.post('/tweet').set('Authorization', token).send(tweet);
            await api
                .post(`/reply/${tweetFail.id}`)
                .set('Authorization', token)
                .send(reply)
                .expect(409);
        });
    });

    describe('DELETE reply test', () => {
        it('DELETE reply successfully', async () => {
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);
            await api
                .delete(`/reply/${reply.id}`)
                .set('Authorization', token)
                .send(reply)
                .expect(201);
        });
    });

    describe('GET reply test', () => {
        it('find reply by ID successfully', async () => {
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);

            await api
                .get(`/reply/${reply.id}`)
                .set('Authorization', token)
                .expect(200);
        });

        it('find reply by owner successfully', async () => {
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);
            await api
                .get(`/reply/owner`)
                .set('Authorization', token)
                .expect(200);
        });

        it('find reply by Tweet-ID successfully', async () => {
            const reply1 = generateTweetRandom();
            const reply2 = generateTweetRandom();

            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply1);
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply2);

            await api
                .get(`/reply/tweet/${tweet.id}`)
                .set('Authorization', token)
                .expect(200);
        });
    });

    describe('POST like reply test', () => {
        /* create tweet before test reply */
        beforeEach(async () => {
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);
        });

        it('add like reply successfuly', async () => {
            await api
                .post(`/reply/like/${reply.id}`)
                .set('Authorization', token)
                .expect(200);
        });

        it('remove like reply tweet', async () => {
            await api
                .post(`/reply/like/${reply.id}`)
                .set('Authorization', token);
            await api
                .post(`/reply/like/${reply.id}`)
                .set('Authorization', token)
                .expect(200);
        });
    });

    describe('POST - REPLY TO REPLY', () => {
        it('create reply to reply', async () => {
            const replyTo = generateTweetRandom();
            await api
                .post(`/reply/${tweet.id}`)
                .set('Authorization', token)
                .send(reply);

            await api
                .post(`/reply-to/${tweet.id}/${reply.id}`)
                .set('Authorization', token)
                .send(replyTo)
                .expect(201);
        });
    });
});
