CREATE DATABASE student_portal;
USE student_portal;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  date DATE
);

-- Sample data
INSERT INTO users (username, password) VALUES ('ansh', '12345'), ('admin', 'admin123');

INSERT INTO events (title, date) VALUES
('Orientation', '2025-10-10'),
('Hackathon', '2025-11-05'),
('Cultural Fest', '2025-12-01'),
('Tech Talk', '2025-12-15'),
('Sports Day', '2026-01-10'),
('Alumni Meet', '2026-02-05');
