DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    day_of_week SMALLINT CHECK (day_of_week between 1 and 7) NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);

