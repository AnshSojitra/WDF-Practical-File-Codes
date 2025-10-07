<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <?php if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
  } ?>
  <h2>Welcome, <?= htmlspecialchars($_SESSION['user']) ?>!</h2>
  <p><a href="logout.php">Logout</a></p>
</body>
</html>
