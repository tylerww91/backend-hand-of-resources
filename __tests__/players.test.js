const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('players routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /players should return a list of players', async () => {
    const resp = await request(app).get('/players');
    expect(resp.status).toBe(200);
  });
});
