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
}

module.exports = { Pet };
