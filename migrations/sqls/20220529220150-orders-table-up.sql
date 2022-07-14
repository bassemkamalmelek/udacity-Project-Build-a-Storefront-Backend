CREATE TABLE IF NOT EXISTS orders
(
    id SERIAL PRIMARY  KEY,
    total numeric(19,4),
    user_id integer,
    CONSTRAINT "user_id_FK" FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)