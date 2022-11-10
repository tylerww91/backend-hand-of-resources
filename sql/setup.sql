-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    color VARCHAR NOT NULL
);

INSERT INTO pets(
    name,
    type,
    color
)

VALUES
('Sevro', 'cat', 'orange & white'),
('Eevee', 'dog', 'faun'),
('Maple', 'cat', 'grey & white'),
('Doctor', 'cat', 'white & black'),
('Beans', 'cat', 'black & grey');