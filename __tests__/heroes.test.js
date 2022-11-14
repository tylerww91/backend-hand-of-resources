const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('heroes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('GET /heroes should return list of heroes', async () => {
    const resp = await request(app).get('/heroes');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "attribute": "intelligence",
          "id": "1",
          "name": "Zeus",
          "role": "carry",
        },
        Object {
          "attribute": "strength",
          "id": "2",
          "name": "Axe",
          "role": "offlane",
        },
        Object {
          "attribute": "intelligence",
          "id": "3",
          "name": "Witch Doctor",
          "role": "support",
        },
        Object {
          "attribute": "agility",
          "id": "4",
          "name": "Shadow Fiend",
          "role": "carry",
        },
        Object {
          "attribute": "strength",
          "id": "5",
          "name": "Snapfire",
          "role": "support",
        },
      ]
    `);
  });

  it.skip('GET /heroes/:id should return an individual hero', async () => {
    const resp = await request(app).get('/heroes/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "attribute": "intelligence",
        "id": "1",
        "name": "Zeus",
        "role": "carry",
      }
    `);
  });

  it.skip('POST /heroes should create a new hero', async () => {
    const newHero = {
      name: 'Clinkz',
      role: 'carry',
      attribute: 'agility',
    };
    const resp = await request(app).post('/heroes').send(newHero);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newHero,
    });
  });

  it.skip('PUT /heroes/1 should update a hero', async () => {
    const resp = await request(app).put('/heroes/1').send({
      role: 'ganker',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.role).toBe('ganker');
  });

  it.skip('DELETE /heroes/1 should delete a hero', async () => {
    const resp = await request(app).delete('/heroes/2');
    expect(resp.status).toBe(200);

    const heroResp = await request(app).get('/heroes/2');
    expect(heroResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
