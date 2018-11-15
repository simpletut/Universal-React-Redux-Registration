const request = require('supertest');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('/api/users', () => {

    let server;
    beforeEach(() => { server = require('./../../index'); });
    afterEach(async (done) => {
        await User.remove({});
        await server.close();
        done();
    });

    describe('GET /api/users', () => {

        test('Should return all users', async () => {

            const newUsers = [{
                fName: 'Joe',
                lName: 'Bloggs',
                email: 'joe@gmail.com',
                username: 'joe',
                password: '123'
            },{
                fName: 'John',
                lName: 'Bloggs',
                email: 'john@gmail.com',
                username: 'john',
                password: '123'        
            }];

            await User.collection.insertMany(newUsers);

            const res = await request(server).get('/api/users');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(user => user.fName === 'Joe')).toBeTruthy();
            expect(res.body.some(user => user.fName === 'John')).toBeTruthy();

        });
    });

    describe('POST /api/users', () => {

        test('Returns a 400 (Bad Request) if the body of the request is invalid', async () => {

            // invalid
            const newUserObj = {
                firstname: 'Joe',
                lastname: 'Bloggs',
                email: 'joebloggs@gmail.co.uk',
                password: '123',
            }

            const res = await request(server).post('/api/users').send(newUserObj);

            expect(res.status).toBe(400);

        });

        test('Returns 400 if user already exists', async () => {

            const existingUser = {
                fName: 'Joe',
                lName: 'Bloggs',
                email: 'joe@gmail.com',
                username: 'joe',
                password: '123'
            }

            const newUser = {
                fName: 'John',
                lName: 'Bloggs',
                email: 'joe@gmail.com',
                username: 'john',
                password: '123'        
            }

            await User.collection.insertMany([existingUser]);
            
            const res = await request(server).post('/api/users').send(newUser);

            expect(res.status).toBe(400);


        });

        test('Saves new user if valid request and is a new user', async () => {

            const newUser = {
                fName: 'John',
                lName: 'Bloggs',
                email: 'joe@gmail.com',
                username: 'john',
                password: '123'        
            }

            const res = await request(server).post('/api/users').send(newUser);

            expect(res.status).toBe(200);

        })

        test('After saving a new user it should return a valid JWT token in the res', async () => {

            const newUser = {
                fName: 'John',
                lName: 'Bloggs',
                email: 'joe@gmail.com',
                username: 'john',
                password: '123'        
            }

            const res = await request(server).post('/api/users').send(newUser);

            const token = res.headers['x-auth-token'];
            const payload = JSON.parse(res.text);
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

            expect(decoded).toMatchObject(payload);

        })


    });

    describe('GET /api/users/current-user', () => {
        
        test('', async () => {
            const newUser = {
                fName: 'John',
                lName: 'Bloggs',
                email: 'joe@gmail.com',
                username: 'john',
                password: '123'        
            }
            
            const token = new User(newUser).generateAuthToken();
    
            await User.collection.insertMany([newUser]);
    
            const res = await request(server)
                .get('/api/users/current-user')
                .set('x-auth-token', token);
    
            expect(res.status).toBe(200)
        })

    });




});