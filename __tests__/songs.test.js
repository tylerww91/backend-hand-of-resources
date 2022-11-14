const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('songs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('GET /songs should return a list of songs', async () => {
    const resp = await request(app).get('/songs');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "artist": "TLC",
          "genre": "R&B/Soul",
          "id": "1",
          "title": "No Scrubs",
        },
        Object {
          "artist": "The Internet",
          "genre": "R&B/Soul",
          "id": "2",
          "title": "Special Affair",
        },
        Object {
          "artist": "Mac Miller",
          "genre": "Hip-Hop/Rap",
          "id": "3",
          "title": "Small Worlds",
        },
        Object {
          "artist": "Walker & Royce",
          "genre": "Dance/Electronic",
          "id": "4",
          "title": "My Own Thang",
        },
        Object {
          "artist": "Chance the Rapper",
          "genre": "Hip-Hop/Rap",
          "id": "5",
          "title": "Cocoa Butter Kisses",
        },
        Object {
          "artist": "J. Cole",
          "genre": "Hip-Hop/Rap",
          "id": "6",
          "title": "my.life",
        },
        Object {
          "artist": "Vince Staples",
          "genre": "Hip-Hop/Rap",
          "id": "7",
          "title": "ARE YOU WITH THAT?",
        },
        Object {
          "artist": "Route 94",
          "genre": "Dance/Electronic",
          "id": "8",
          "title": "My Love",
        },
        Object {
          "artist": "Disclosure",
          "genre": "Dance/Electronic",
          "id": "9",
          "title": "January",
        },
      ]
    `);
  });

  it.skip('GET /songs/1 should return an individual song', async () => {
    const resp = await request(app).get('/songs/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "artist": "TLC",
        "genre": "R&B/Soul",
        "id": "1",
        "title": "No Scrubs",
      }
    `);
  });

  it.skip('POST /songs should create a new song', async () => {
    const newSong = {
      title: 'FRONTAL LOBE MUZIK',
      artist: 'Daniel Caesar',
      genre: 'R&B/Soul',
    };
    const resp = await request(app).post('/songs').send(newSong);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newSong,
    });
  });

  it('PUT /songs/3 should update an existing song', async () => {
    const resp = await request(app).put('/songs/3').send({
      title: 'Diablo',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toEqual('Diablo');
  });
});
