-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL
);

INSERT INTO pets(
    name,
    type
)

VALUES
('Sevro', 'cat'),
('Eevee', 'dog'),
('Maple', 'cat'),
('Doctor', 'cat'),
('Beans', 'cat');