<?php include 'db.php'; session_start(); ?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>User Login</h2>
  <?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
      $stmt->bind_result($id, $username, $hashed);
      $stmt->fetch();
      if (password_verify($password, $hashed)) {
        $_SESSION['user'] = $username;
        header("Location: dashboard.php");
        exit;
      } else {
        echo "<p class='error'>❌ Incorrect password.</p>";
      }
    } else {
      echo "<p class='error'>❌ User not found.</p>";
    }
  }
  ?>
  <form method="POST">
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</body>
</html>
