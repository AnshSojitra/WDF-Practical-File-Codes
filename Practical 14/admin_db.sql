CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  role ENUM('admin','user') DEFAULT 'user'
);
