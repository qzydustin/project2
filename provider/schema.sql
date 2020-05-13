DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    items VARCHAR(20),
    amount VARCHAR(20),
    note VARCHAR(20),
    urgent INT DEFAULT 0,
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

