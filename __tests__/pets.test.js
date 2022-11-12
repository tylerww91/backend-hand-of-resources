const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('GET /pets should return a list of pets', async () => {
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

  it.skip('GET /pets/:id should return an individual pet', async () => {
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

  it.skip('POST /pets should create a new pet', async () => {
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

  it.skip('PUT /pets/1 should update an existing pet', async () => {
    const resp = await request(app).put('/pets/1').send({
      color: 'green',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.color).toBe('green');
  });

  it.skip('DELETE /pets/:id should delete a pet', async () => {
    const resp = await request(app).delete('/pets/2');
    expect(resp.status).toBe(200);

    const petResp = await request(app).get('/pets/2');
    expect(petResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
