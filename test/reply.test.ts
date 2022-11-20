import { api } from "./user-register.test"
import { generateRandomUser, generateTweetRandom } from "./utils/generate.random.user"


describe('test for reply', () => {

    let token: string
    let tweet = generateTweetRandom()

    beforeAll(async () => {
        /* register user before test  */
        const userRegister = generateRandomUser()
        const { email, password } = userRegister
        const userLogin = {
            email,
            password
        }
        await api.post('/auth/register').send(userRegister)
        const { body } = await api.post('/auth/login').send(userLogin)
        token = body.token
    })

    describe('POST create reply test', () => {
        /* create tweet before test reply */
        beforeEach(async () => {
            await api.post('/tweet').set('Authorization', token).send(tweet)
        })

        it('create reply successfully', async () => {
            const reply = generateTweetRandom()

            await api.post(`/reply/${tweet.id}`).set('Authorization', token).send(reply).expect(201)
        })

        it('create reply failed - tweet not found ', async () => {
            const reply = generateTweetRandom()
            const tweetFail = generateTweetRandom()

            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.post(`/reply/${tweetFail.id}`).set('Authorization', token).send(reply).expect(409)
        })

    })

    describe('DELETE reply test', () => {
        /* create tweet before test reply */
        beforeEach(async () => {
            await api.post('/tweet').set('Authorization', token).send(tweet)
        })

        it('DELETE reply successfully', async () => {
            const reply = generateTweetRandom()

            await api.post(`/reply/${tweet.id}`).set('Authorization', token).send(reply)
            await api.delete(`/reply/${reply.id}`).set('Authorization', token).send(reply).expect(201)
        })

    })

    describe('GET reply test', () => {
        /* create tweet before test reply */
        beforeEach(async () => {
            await api.post('/tweet').set('Authorization', token).send(tweet)
        })

        it('find reply by ID successfully', async () => {
            const reply = generateTweetRandom()

            await api.post(`/reply/${tweet.id}`).set('Authorization', token).send(reply)
            await api.get(`/reply/${reply.id}`).set('Authorization', token).expect(200)
        })
        it('find reply by owner successfully', async () => {
            const reply = generateTweetRandom()

            await api.post(`/reply/${tweet.id}`).set('Authorization', token).send(reply)
            await api.get(`/reply/owner`).set('Authorization', token).expect(200)
        })

    })

    describe('like reply tesh', () => {
        /* create tweet before test reply */
        const reply = generateTweetRandom()
        beforeEach(async () => {
            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.post(`/reply/${tweet.id}`).set('Authorization', token).send(reply)
        })


        it('add like reply successfuly', async () => {

            await api.post(`/reply/like/${reply.id}`).set('Authorization', token).expect(200)
        })

        it('remove like tweet', async () => {

            await api.post(`/reply/like/${reply.id}`).set('Authorization', token)
            await api.post(`/reply/like/${reply.id}`).set('Authorization', token).expect(200)
        })
    })

})