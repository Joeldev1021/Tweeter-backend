
/* ================ login test ================= */

import { api } from "./user-register.test"
import { generateRandomUser } from "./utils/generate.random.user"

describe('login test', () => {
    it('login user successfuly', async () => {
        const userRegister = generateRandomUser()
        const { email, password } = userRegister
        const userLogin = {
            email,
            password
        }

        await api.post('/auth/register').send(userRegister).expect(201)
        await api.post('/auth/login').send(userLogin).expect(200)
    })

    it('login failed user not register', async () => {
        const { email, password } = generateRandomUser()
        const userFail = {
            email,
            password
        }
        await api.post('/auth/login').send(userFail).expect(409)
    })

    it('login user failed unnecesary filed', async () => {
        const userRegister = generateRandomUser()

        await api.post('/auth/register').send(userRegister).expect(201)
        await api.post('/auth/login').send(userRegister).expect(400)
    })


    it('login password incorrect', async () => {
        const userRegister = generateRandomUser()
        const { email } = userRegister
        const userLogin = {
            email,
            password: 'testpassword'
        }

        await api.post('/auth/register').send(userRegister).expect(201)
        await api.post('/auth/login').send(userLogin).expect(409)
    })

    it('login - email incorrect', async () => {
        const userRegister = generateRandomUser()
        const { password } = userRegister
        const userLogin = {
            email: "test@gmail.com",
            password
        }

        await api.post('/auth/register').send(userRegister).expect(201)
        await api.post('/auth/login').send(userLogin).expect(409)

    })

})