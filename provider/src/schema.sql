DROP TABLE IF EXISTS Message;
CREATE TABLE Message(
    id SERIAL PRIMARY KEY,
    key TEXT,
    message TEXT,
    id_deleted INT DEFAULT 0,
    will_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);