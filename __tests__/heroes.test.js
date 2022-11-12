const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('heroes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /heroes should return list of heroes', async () => {
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

  it('GET /heroes/:id should return an individual hero', async () => {
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

  it('POST /heroes should create a new hero', async () => {
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
  afterAll(() => {
    pool.end();
  });
});
