const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/db');
const pgmigrate  = require('node-pg-migrate');
const truncateAllTables = require('./truncateAllTables');

let accessToken;

beforeAll(async () => {
    await truncateAllTables();

    await pgmigrate.default({
        databaseUrl: process.env.TEST_DATABASE_URL,
        dir: 'migrations',
        direction: 'down',
        count: Infinity,
        migrationsTable: 'pgmigrations',
        noLock: true,
      });
    

    await pgmigrate.default({
        databaseUrl: process.env.TEST_DATABASE_URL,
        dir: 'migrations',
        direction: 'up',
        count: Infinity,
        migrationsTable: 'pgmigrations',
        createSchema: true,
        noLock: true,
        verbose: false,
      });
  // Optionally clear users table or use a test-specific user

  const userData = {
    email: 'pramod@example.com',
    password: 'password123',
    role: 'user'
  };

  // Register user
  await request(app)
    .post('/api/auth/register')
    .send(userData);

  // Login user
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: userData.email,
      password: userData.password
    });
    accessToken = res.body.accessToken;
    console.log(accessToken, res.body);
});

afterAll(async () => {
  await knex.destroy();
});

afterAll(async () => {
  await knex.destroy();
});

test('sanity check for userController', () => {
    expect(true).toBe(true);
  });

describe('User Controller', () => {

  test('Get users', async () => {
    const res = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${accessToken}`);

    console.log('get user', res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
