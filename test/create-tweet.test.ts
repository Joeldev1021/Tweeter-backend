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

    it('create tweet successfully', async () => {
        const tweet = generateTweetRandom()
        await api.post('/tweet').set('Authorization', token).send(tweet).expect(201)
    })

}) 