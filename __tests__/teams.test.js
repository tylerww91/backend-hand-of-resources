const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('teams routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('GET /teams should return all teams', async () => {
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

  it.skip('GET /teams/1 should return an individual team', async () => {
    const resp = await request(app).get('/teams/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "city": "San Antonio",
        "id": "1",
        "mascot": "The Coyote",
        "name": "Spurs",
      }
    `);
  });

  it.skip('POST /teams should create a team', async () => {
    const newTeam = {
      name: 'Kings',
      city: 'Sacramento',
      mascot: 'Slamson the Lion',
    };
    const resp = await request(app).post('/teams').send(newTeam);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newTeam,
    });
  });

  it.skip('PUT /teams/2 should update an existing team', async () => {
    const resp = await request(app).put('/teams/2').send({
      city: 'Minnesota',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.city).toBe('Minnesota');
  });

  it.skip('DELETE /teams/1 should delete an existing team', async () => {
    const resp = await request(app).delete('/teams/1');
    expect(resp.status).toBe(200);

    const teamResp = await request(app).get('/teams/1');
    expect(teamResp.status).toBe(404);
  });
});
