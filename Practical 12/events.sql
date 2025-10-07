CREATE DATABASE IF NOT EXISTS event_db;
USE event_db;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status ENUM('open','closed') DEFAULT 'open',
    poster VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
