CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY  KEY,
    full_name VARCHAR(150),
    password VARCHAR(450)
)