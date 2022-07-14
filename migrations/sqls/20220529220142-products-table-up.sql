CREATE TABLE IF NOT EXISTS products
(
    id SERIAL PRIMARY  KEY,
    product_name VARCHAR(100),
    price numeric(19,4)
)