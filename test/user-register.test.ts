import { connectDb, clear, closeDb } from './utils/setup-tests'
import supertest from 'supertest'
import { generateRandomUser } from './utils/generate.random.user'
import { appServer, serverListen } from '../src/app'

const api = supertest(appServer)

beforeAll(async () => await connectDb())
beforeEach(async () => await clear())
afterAll(async () => {
    await closeDb()
    await serverListen.close()
})

describe('Post endpoints test', () => {
    it('should register new user', async () => {
        const user = generateRandomUser()
        await api.post('/auth/register').send(user).set('Accept', 'application/json').expect(201)
    })
})

