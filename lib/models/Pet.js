const pool = require('../utils/pool');

class Pet {
  id;
  name;
  type;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.color = row.color;
  }

  static async getAll() {
    const { rows } = await pool.query(`
        SELECT * FROM pets;
    `);
    return rows.map((row) => new Pet(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM pets 
        WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Pet(rows[0]);
  }

  static async insert({ name, type, color }) {
    const { rows } = await pool.query(
      `
          INSERT INTO pets (name, type, color)
          VALUES ($1, $2, $3)
          RETURNING *
      `,
      [name, type, color]
    );
    return new Pet(rows[0]);
  }
}

module.exports = { Pet };
