const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /pets should return a list of pets', async () => {
    const resp = await request(app).get('/pets');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "orange & white",
          "id": "1",
          "name": "Sevro",
          "type": "cat",
        },
        Object {
          "color": "faun",
          "id": "2",
          "name": "Eevee",
          "type": "dog",
        },
        Object {
          "color": "grey & white",
          "id": "3",
          "name": "Maple",
          "type": "cat",
        },
        Object {
          "color": "white & black",
          "id": "4",
          "name": "Doctor",
          "type": "cat",
        },
        Object {
          "color": "black & grey",
          "id": "5",
          "name": "Beans",
          "type": "cat",
        },
      ]
    `);
  });

  it('GET /pets/:id should return an individual pet', async () => {
    const resp = await request(app).get('/pets/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "color": "orange & white",
        "id": "1",
        "name": "Sevro",
        "type": "cat",
      }
    `);
  });

  it('POST /pets should create a new pet', async () => {
    const newPet = {
      name: 'Big Daddy',
      type: 'dog',
      color: 'brown',
    };
    const resp = await request(app).post('/pets').send(newPet);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPet,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
