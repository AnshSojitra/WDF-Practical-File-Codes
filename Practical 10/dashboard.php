<?php
require "session_check.php";
?>

<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <form>
    <h2>Welcome, <?php echo $_SESSION['user']; ?>!</h2>
    <p>Role: <?php echo $_SESSION['role']; ?></p>

    <?php
    if ($_SESSION["role"] === "admin") {
        echo "<p>🔐 Admin access granted.</p>";
    } else {
        echo "<p>👤 User access only.</p>";
    }
    ?>

    <a href="logout.php">Logout</a>
  </form>
</body>
</html>
