DROP TABLE IF EXISTS data;
CREATE TABLE data(
    id SERIAL PRIMARY KEY,
    pass TEXT,
    information TEXT,
    is_deleted INT DEFAULT 0,
    will_deleted INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

