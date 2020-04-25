DROP TABLE IF EXISTS Message;
CREATE TABLE Message(
    id SERIAL PRIMARY KEY,
    key VARCHAR(20),
    message TEXT,
    will_deleted INT default 0,
    is_deleted INT default 0,
    day INT,
    month INT,
    year INT,
);
