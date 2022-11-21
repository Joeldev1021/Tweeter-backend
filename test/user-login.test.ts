import { api } from "./user-register.test"
import { generateRandomUser } from "./utils/generate.random.user"

/* ================ login test ================= */

describe('LOGIN TEST', () => {
    const userRegister = generateRandomUser()

    beforeEach(async () => {
        /* register user before test  */
        await api.post('/auth/register').send(userRegister)
    })


    it('login user successfuly', async () => {
        const { email, password } = userRegister
        const userLogin = {
            email,
            password
        }
        await api.post('/auth/login').send(userLogin).expect(200)
    })

    it('login failed - user not register', async () => {
        const { email, password } = generateRandomUser()
        const userFail = {
            email,
            password
        }
        await api.post('/auth/login').send(userFail).expect(409)
    })

    it('login user failed unnecesary filed', async () => {

        await api.post('/auth/login').send(userRegister).expect(400)
    })


    it('login password incorrect', async () => {
        const { email } = userRegister
        const userLogin = {
            email,
            password: 'testpassword'
        }

        await api.post('/auth/login').send(userLogin).expect(409)
    })

    it('login - email incorrect', async () => {
        const { password } = userRegister
        const userLogin = {
            email: "test@gmail.com",
            password
        }

        await api.post('/auth/login').send(userLogin).expect(409)

    })

})