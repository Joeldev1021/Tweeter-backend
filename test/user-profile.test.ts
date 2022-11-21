import { generateRandomUser, generateTweetRandom } from './utils/generate.random.user'
import { api } from './user-register.test'

describe('test for profile user', () => {

    let token: string
    let userName: string

    beforeEach(async () => {
        const userRegister = generateRandomUser()
        await api.post('/auth/register').send(userRegister).expect(201)
        const { email, password } = userRegister
        const { body } = await api.post('/auth/login').send({ email, password })
        token = body.token
        userName = userRegister.username
    })

    describe('GET profile ', () => {

        beforeEach(async () => {
            for (let index = 0; index < 3; index++) {
                const tweet = generateTweetRandom()
                await api.post('/tweet').set('Authorization', token).send(tweet)
            }
        })

        test('find profile user successfully', async () => {

            await api.get(`/user/${userName}`).set('Authorization', token).expect(200)
        })



    })



})
