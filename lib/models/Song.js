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
}

module.exports = { Song };
