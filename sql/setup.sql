-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS heroes;
DROP TABLE IF EXISTS teams;


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

CREATE TABLE heroes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    attribute VARCHAR NOT NULL
);

INSERT INTO heroes(
    name,
    role,
    attribute
)

VALUES
('Zeus', 'carry', 'intelligence'),
('Axe', 'offlane', 'strength'),
('Witch Doctor', 'support', 'intelligence'),
('Shadow Fiend', 'carry', 'agility'),
('Snapfire', 'support', 'strength');

CREATE TABLE teams (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    mascot VARCHAR NOT NULL
);

INSERT INTO teams(
    name,
    city,
    mascot
)

VALUES
('Spurs', 'San Antonio', 'The Coyote'),
('Timberwolves', 'Minneapolis', 'Crunch the Wolf'),
('Celtics', 'Boston', 'Lucky the Leprechaun'),
('Blazers', 'Portland', 'Blaze the Trail Cat'),
('Bulls', 'Chicago', 'Benny the Bull');