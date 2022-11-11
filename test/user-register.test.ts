import { connectDb, clear, closeDb } from './utils/setup-tests'
import supertest from 'supertest'
import { generateRandomUser } from './utils/generate.random.user'
import { appServer, serverListen } from '../src/app'

export const api = supertest(appServer)

beforeAll(async () => await connectDb())
beforeEach(async () => await clear())
afterAll(async () => {
    await closeDb()
    serverListen.close()
})

describe('Register test', () => {
    it('should register new user', async () => {
        const user = generateRandomUser()
        await api.post('/auth/register').send(user).set('Accept', 'application/json').expect(201)
    });

    it('register failed Duplicate-ID', async () => {
        const user = generateRandomUser();
        const userFail = {
            ...generateRandomUser(),
            id: user.id
        }
        await api.post('/auth/register').send(user).expect(201)

        await api.post('/auth/register').send(userFail).expect(409)
    })

    it('register failed ID-malformed', async () => {
        const userFail = {
            ...generateRandomUser(),
            id: '1234'
        }
        await api.post('/auth/register').send(userFail).expect(400)
    })

    it('register failed invalid-email format', async () => {
        const userFail = {
            ...generateRandomUser(),
            email: 'test'
        }
        await api.post('/auth/register').send(userFail).expect(400)
    })

    it('register failed invalid-username format', async () => {
        const userFail = {
            ...generateRandomUser(),
            username: 'jo'
        }
        await api.post('/auth/register').send(userFail).expect(400)
    })


    it('register failed unnecesary field', async () => {
        const userFail = {
            ...generateRandomUser(),
            error: 'error'
        }
        await api.post('/auth/register').send(userFail).expect(400)
    })

    it('register failed missing field', async () => {
        const { id, email, password } = generateRandomUser()
        const userFail = {
            id,
            email,
            password
        }
        await api.post('/auth/register').send(userFail).expect(400)
    })

})
