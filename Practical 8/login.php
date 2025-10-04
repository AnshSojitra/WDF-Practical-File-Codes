<?php
session_start();
require "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $conn->real_escape_string($_POST["username"]);
  $password = $conn->real_escape_string($_POST["password"]);

  $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
  $result = $conn->query($sql);

  if ($result->num_rows === 1) {
    $_SESSION["username"] = $username;
    header("Location: dashboard.php");
    exit();
  } else {
    $error = "Invalid credentials";
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h2>Login</h2>
  <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
  <form method="POST">
    <label>Username:</label>
    <input type="text" name="username" required /><br />
    <label>Password:</label>
    <input type="password" name="password" required /><br />
    <input type="submit" value="Login" />
  </form>
</body>
</html>
