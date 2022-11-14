const pool = require('../utils/pool');

class Song {
  id;
  title;
  artist;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query(`
        SELECT * FROM songs
    `);
    return rows.map((row) => new Song(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM songs
        WHERE id = $1
      `,
      [id]
    );
    return new Song(rows[0]);
  }

  static async insert({ title, artist, genre }) {
    const { rows } = await pool.query(
      `
        INSERT INTO songs (title, artist, genre)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, artist, genre]
    );
    return new Song(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const song = await Song.getById(id);

    if (!song) return null;

    const updatedSong = { ...song, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE songs
        SET title = $2, artist = $3, genre = $4
        WHERE id = $1
        RETURNING *
      `,
      [id, updatedSong.title, updatedSong.artist, updatedSong.genre]
    );
    return new Song(rows[0]);
  }
}

module.exports = { Song };
