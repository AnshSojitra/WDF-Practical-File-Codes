<?php
session_start();
require "users.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  if (isset($users[$username]) && $users[$username] === $password) {
    $_SESSION["username"] = $username;

    if (isset($_POST["remember"])) {
      setcookie("remember_user", $username, time() + (86400 * 7)); // 7 days
    }
  } else {
    echo "<h3>Invalid credentials</h3>";
    echo "<a href='index.php'>Try again</a>";
    exit();
  }
}

if (!isset($_SESSION["username"])) {
  header("Location: index.php");
  exit();
}
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

  <h3>Event List</h3>
  <input type="text" id="search" placeholder="Search events..." />
  <select id="sort">
    <option value="title">Sort by Title</option>
    <option value="date">Sort by Date</option>
  </select>
  <div id="event-container"></div>

  <script src="events.js"></script>
</body>
</html>
