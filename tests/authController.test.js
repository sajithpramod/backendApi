const request = require('supertest');
const app = require('../src/app'); // your Express app
const knex = require('../src/db');

const truncateAllTables = require('./truncateAllTables');

beforeAll(async () => {
  await truncateAllTables();

});
afterAll(async () => {
  await knex.destroy();
});

describe('Auth Controller', () => {
  const userData = {
    email: 'sajith4@example.com',
    password: 'password123',
    role: 'user'
  };

  test('Register user', async () => {
    const res = await request(app)
      .post('/api/auth/register') // adjust to your route
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', userData.email);
  });

  test('Login user', async () => {
    const res = await request(app)
      .post('/api/auth/login') // adjust to your route
      .send({ email: userData.email, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    console.log('auth', res.body);
  });

  test('Login fails with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });
});
