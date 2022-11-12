const pool = require('../utils/pool');

class Hero {
  id;
  name;
  role;
  attribute;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.role = row.role;
    this.attribute = row.attribute;
  }

  static async getAll() {
    const { rows } = await pool.query(`
            SELECT * FROM heroes
    `);
    return rows.map((row) => new Hero(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM heroes
        WHERE id = $1
      `,
      [id]
    );
    if (!rows.length === 0) {
      return null;
    }
    return new Hero(rows[0]);
  }
}

module.exports = { Hero };
