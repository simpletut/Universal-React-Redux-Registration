const request = require('supertest');
const { User } = require('./../../models/user');

describe('auth middleware', () => {

    let server;
    beforeEach(() => { server = require('./../../index'); });
    afterEach(async (done) => {
        await User.remove({});
        await server.close();
        done();
    });

    let token;

    const exec = () => {
        return request(server).get('/api/users/current-user')
            .set('x-auth-token', token);
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    test('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    test('should return 400 if token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    test('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });


});