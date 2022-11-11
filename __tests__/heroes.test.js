const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('heroes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /heroes should return all heroes', async () => {
    const resp = await request(app).get('/heroes');
    expect(resp.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
