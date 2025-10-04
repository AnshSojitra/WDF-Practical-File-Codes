<?php
session_start();
if (isset($_SESSION['username'])) {
  header("Location: dashboard.php");
  exit();
}

if (isset($_COOKIE['remember_user'])) {
  $_SESSION['username'] = $_COOKIE['remember_user'];
  header("Location: dashboard.php");
  exit();
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
  <form method="POST" action="dashboard.php">
    <label>Username:</label>
    <input type="text" name="username" required /><br />

    <label>Password:</label>
    <input type="password" name="password" required /><br />

    <label>Remember Me:</label>
    <input type="checkbox" name="remember" /><br />

    <input type="submit" value="Login" />
  </form>
</body>
</html>
