const pool = require('../utils/pool');

class Team {
  id;
  name;
  city;
  mascot;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.mascot = row.mascot;
  }

  static async getAll() {
    const { rows } = await pool.query(`
            SELECT * FROM teams
    `);
    return rows.map((row) => new Team(row));
  }
}

module.exports = { Team };
