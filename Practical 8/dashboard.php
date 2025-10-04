<?php
session_start();
require "db.php";

if (!isset($_SESSION["username"])) {
  header("Location: login.php");
  exit();
}

$sql = "SELECT * FROM events ORDER BY date DESC LIMIT 5";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h2>Welcome, <?php echo $_SESSION["username"]; ?>!</h2>
  <a href="logout.php">Logout</a>

  <h3>Latest Events</h3>
  <ul>
    <?php while ($row = $result->fetch_assoc()): ?>
      <li><strong><?php echo $row["title"]; ?></strong> - <?php echo $row["date"]; ?></li>
    <?php endwhile; ?>
  </ul>
</body>
</html>
