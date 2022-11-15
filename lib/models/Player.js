const pool = require('../utils/pool');

class Player {
  id;
  name;
  team;
  position;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.team = row.team;
    this.position = row.position;
  }

  static async getAll() {
    const { rows } = await pool.query(`
        SELECT * FROM players
    `);
    return rows.map((row) => new Player(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
            SELECT * FROM players
            WHERE id = $1
        `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Player(rows[0]);
  }

  static async insert({ name, team, position }) {
    const { rows } = await pool.query(
      `
        INSERT INTO players (name, team, position)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, team, position]
    );
    return new Player(rows[0]);
  }
}

module.exports = { Player };
