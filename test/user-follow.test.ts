import { api } from './user-register.test';
import { generateRandomUser } from './utils/generate.random.user';

describe('TEST FOR FOLLOW', () => {
    let token: string;
    let userFollow: any;

    beforeEach(async () => {
        const userRegister = generateRandomUser();
        userFollow = generateRandomUser();
        const { body } = await api.post('/auth/register').send(userRegister);
        await api.post('/auth/register').send(userFollow);
        token = body.token;
    });

    describe('Following User', () => {
        it('following successfully', async () => {
            await api
                .post(`/user/following/${userFollow.id}`)
                .set('Authorization', token)
                .expect(200);
        });
        it('unfollow successfully', async () => {
            await api
                .post(`/user/following/${userFollow.id}`)
                .set('Authorization', token);

            await api
                .post(`/user/unfollow/${userFollow.id}`)
                .set('Authorization', token)
                .expect(200);
        });
    });
});
