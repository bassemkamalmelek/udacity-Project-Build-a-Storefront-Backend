CREATE TABLE IF NOT EXISTS orders_products
(
    id SERIAL PRIMARY  KEY,
    order_id integer,
    product_id integer,
    quantity integer,
    price numeric(19,0),
    total_price numeric(19,0),
    CONSTRAINT "product_id_FK" FOREIGN KEY (product_id)
        REFERENCES products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "order_id_FK" FOREIGN KEY (order_id)
        REFERENCES orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)