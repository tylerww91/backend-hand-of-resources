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
}

module.exports = { Hero };
