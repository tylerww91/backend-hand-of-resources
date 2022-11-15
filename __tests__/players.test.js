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
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "name": "Stephen Curry",
          "position": "PG",
          "team": "Warriors",
        },
        Object {
          "id": "2",
          "name": "Ja Morant",
          "position": "PG",
          "team": "Grizzlies",
        },
        Object {
          "id": "3",
          "name": "Evan Mobley",
          "position": "PF",
          "team": "Caveliers",
        },
        Object {
          "id": "4",
          "name": "Damian Lillard",
          "position": "PG",
          "team": "Blazers",
        },
        Object {
          "id": "5",
          "name": "Luka Doncic",
          "position": "PG",
          "team": "Mavericks",
        },
        Object {
          "id": "6",
          "name": "Joel Embiid",
          "position": "C",
          "team": "76ers",
        },
        Object {
          "id": "7",
          "name": "Lebron James",
          "position": "PF",
          "team": "Lakers",
        },
        Object {
          "id": "8",
          "name": "Kawhi Leonard",
          "position": "SF",
          "team": "Clippers",
        },
      ]
    `);
  });

  it('GET /players/1 should return an individual player', async () => {
    const resp = await request(app).get('/players/1');
    expect(resp.status).toBe(200);
  });

  it('POST /players should create a new player', async () => {
    const newPlayer = {
      name: 'Nikola Jokic',
      team: 'Nuggets',
      position: 'C',
    };
    const resp = await request(app).post('/players').send(newPlayer);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPlayer,
    });
  });

  it('PUT /players/7 should update an individual player', async () => {
    const resp = await request(app).put('/players/7').send({
      position: 'SF',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.position).toEqual('SF');
  });

  it('DELETE /players/3 should delete an individual player', async () => {
    const resp = await request(app).delete('/players/3');
    expect(resp.status).toBe(200);

    const playerResp = await request(app).get('/players/3');
    expect(playerResp.status).toBe(404);
  });
});
