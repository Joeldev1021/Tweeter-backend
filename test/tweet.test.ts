import { api } from "./user-register.test"
import { generateRandomUser, generateTweetRandom } from "./utils/generate.random.user"


describe('test for tweet', () => {

    let token: string

    beforeAll(async () => {
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
    describe('create tweet test', () => {
        it('create tweet successfully', async () => {
            const tweet = generateTweetRandom()
            await api.post('/tweet').set('Authorization', token).send(tweet).expect(201)
        })

        it('create tweet failed invalid - format content', async () => {
            const tweet = generateTweetRandom()
            const tweetFail = {
                ...tweet,
                content: ''
            }
            await api.post('/tweet').set('Authorization', token).send(tweetFail).expect(400)
        })

        it('create tweet failed - not token', async () => {
            const tweet = generateTweetRandom()
            await api.post('/tweet').set('Authorization', '').send(tweet).expect(400)
        })

        it('create tweet failed duplicate ID', async () => {
            const tweet = generateTweetRandom()
            const tweetFail = {
                ...tweet
            }

            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.post('/tweet').set('Authorization', token).send(tweetFail).expect(409)
        })
    })

    describe('delete tweet test', () => {
        it('delete tweet successfuly', async () => {
            const tweet = generateTweetRandom()

            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.delete(`/tweet/${tweet.id}`).set('Authorization', token).expect(201)
        })

    })

    describe('find tweet  test', () => {
        it('find tweet by id  successfuly', async () => {
            const tweet = generateTweetRandom()

            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.get(`/tweet/${tweet.id}`).set('Authorization', token).expect(200)
        })

        it('find tweet by onwer id successfuly', async () => {
            const tweet = generateTweetRandom()

            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.get(`/tweet/owner`).set('Authorization', token).expect(200)
        })

        it('find tweet all tweet id successfuly', async () => {
            const tweet = generateTweetRandom()
            const tweet2 = generateTweetRandom()

            await api.post('/tweet').set('Authorization', token).send(tweet)
            await api.post('/tweet').set('Authorization', token).send(tweet2)

            const response = await api.get(`/tweet`).set('Authorization', token)
            expect(response.body).toHaveLength(2)
        })

    })




}) 