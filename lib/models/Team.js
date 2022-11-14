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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM teams
        WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Team(rows[0]);
  }

  static async insert({ name, city, mascot }) {
    const { rows } = await pool.query(
      `
        INSERT INTO teams (name, city, mascot)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, city, mascot]
    );
    return new Team(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const team = await Team.getById(id);

    if (!team) return null;

    const updatedTeam = { ...team, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE teams
        SET name = $2, city = $3, mascot = $4
        WHERE id = $1
        RETURNING *
      `,
      [id, updatedTeam.name, updatedTeam.city, updatedTeam.mascot]
    );
    return new Team(rows[0]);
  }
}

module.exports = { Team };
