const request = require('supertest');
const app = require('../src/app'); // your Express app
const knex = require('../src/db');
const pgmigrate  = require('node-pg-migrate');
const truncateAllTables = require('./truncateAllTables');

beforeAll(async () => {
    await truncateAllTables();
    // await pgmigrate.default({
    //     databaseUrl: process.env.TEST_DATABASE_URL,
    //     dir: 'migrations',
    //     direction: 'down',
    //     count: Infinity,
    //     migrationsTable: 'pgmigrations',
    //     noLock: true,
    //   });
    
    // await pgmigrate.default({
    //     databaseUrl: process.env.TEST_DATABASE_URL,
    //     dir: 'migrations',
    //     direction: 'up',
    //     count: Infinity,
    //     migrationsTable: 'pgmigrations',
    //     createSchema: true,
    //     noLock: true,
    //     verbose: false,
    //   });
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
