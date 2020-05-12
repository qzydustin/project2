DROP DATABASE IF EXISTS orders;
DROP USER IF EXISTS orders_user;

CREATE DATABASE orders CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER orders_user IDENTIFIED BY 'QWERTY123uwec!';
GRANT ALL PRIVILEGES ON orders.* TO orders_user;
