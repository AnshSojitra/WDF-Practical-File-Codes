<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>User Registration</h2>
  <?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    if (!preg_match("/^[a-zA-Z0-9_]{3,20}$/", $username)) {
      echo "<p class='error'>Invalid username format.</p>";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo "<p class='error'>Invalid email address.</p>";
    } elseif (strlen($password) < 6) {
      echo "<p class='error'>Password must be at least 6 characters.</p>";
    } else {
      $hashed = password_hash($password, PASSWORD_DEFAULT);
      $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
      $stmt->bind_param("sss", $username, $email, $hashed);
      echo $stmt->execute() ? "<p class='success'>✅ Registered successfully!</p>" : "<p class='error'>❌ Registration failed.</p>";
    }
  }
  ?>
  <form method="POST">
    <input type="text" name="username" placeholder="Username" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Register</button>
  </form>
</body>
</html>
