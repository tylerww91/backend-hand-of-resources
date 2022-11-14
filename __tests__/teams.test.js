const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('teams routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /teams should return all teams', async () => {
    const resp = await request(app).get('/teams');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "city": "San Antonio",
          "id": "1",
          "mascot": "The Coyote",
          "name": "Spurs",
        },
        Object {
          "city": "Minneapolis",
          "id": "2",
          "mascot": "Crunch the Wolf",
          "name": "Timberwolves",
        },
        Object {
          "city": "Boston",
          "id": "3",
          "mascot": "Lucky the Leprechaun",
          "name": "Celtics",
        },
        Object {
          "city": "Portland",
          "id": "4",
          "mascot": "Blaze the Trail Cat",
          "name": "Blazers",
        },
        Object {
          "city": "Chicago",
          "id": "5",
          "mascot": "Benny the Bull",
          "name": "Bulls",
        },
      ]
    `);
  });
});
