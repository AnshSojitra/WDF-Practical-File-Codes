<?php include 'db.php'; session_start(); ?>
<!DOCTYPE html>
<html>
<head>
  <title>Admin Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>Admin Login</h2>
  <?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $stmt = $conn->prepare("SELECT id, username, role FROM users WHERE email=? AND role='admin'");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows === 1) {
      $stmt->bind_result($id, $username, $role);
      $stmt->fetch();
      $_SESSION['admin'] = $username;
      header("Location: dashboard.php");
      exit;
    } else {
      echo "<p class='error'>❌ Access denied.</p>";
    }
  }
  ?>
  <form method="POST">
    <input type="email" name="email" placeholder="Admin Email" required>
    <button type="submit">Login</button>
  </form>
</body>
</html>
