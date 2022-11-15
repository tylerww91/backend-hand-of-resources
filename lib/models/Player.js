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

  static async updateById(id, newAttrs) {
    const player = await Player.getById(id);

    if (!player) return null;

    const updatedPlayer = { ...player, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE players
        SET name = $2, team = $3, position = $4
        WHERE id = $1
        RETURNING *
      `,
      [id, updatedPlayer.name, updatedPlayer.team, updatedPlayer.position]
    );
    return new Player(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM players
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );
    return new Player(rows[0]);
  }
}

module.exports = { Player };
