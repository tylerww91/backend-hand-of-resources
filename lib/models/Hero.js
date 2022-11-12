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
    if (rows.length === 0) {
      return null;
    }
    return new Hero(rows[0]);
  }

  static async insert({ name, role, attribute }) {
    const { rows } = await pool.query(
      `
        INSERT INTO heroes (name, role, attribute)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, role, attribute]
    );
    return new Hero(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const hero = await Hero.getById(id);

    if (!hero) return null;

    const updatedHero = { ...hero, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE heroes
        SET name = $2, role = $3, attribute = $4
        WHERE id = $1
        RETURNING *;
      `,
      [id, updatedHero.name, updatedHero.role, updatedHero.attribute]
    );
    return new Hero(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from heroes
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );
    console.log;
    return new Hero(rows[0]);
  }
}

module.exports = { Hero };
