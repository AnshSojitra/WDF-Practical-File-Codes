<?php include 'db.php'; session_start();
if (!isset($_SESSION['admin'])) {
  header("Location: login.php");
  exit;
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>Welcome, <?= htmlspecialchars($_SESSION['admin']) ?> (Admin)</h2>
  <p><a href="logout.php">Logout</a></p>

  <?php
  // Delete user
  if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
    $stmt->bind_param("i", $id);
    echo $stmt->execute() ? "<p class='success'>🗑️ User deleted.</p>" : "<p class='error'>❌ Deletion failed.</p>";
  }

  // Toggle status
  if (isset($_GET['toggle'])) {
    $id = $_GET['toggle'];
    $stmt = $conn->prepare("UPDATE users SET status = IF(status='active','inactive','active') WHERE id=?");
    $stmt->bind_param("i", $id);
    echo $stmt->execute() ? "<p class='success'>🔄 Status updated.</p>" : "<p class='error'>❌ Update failed.</p>";
  }

  // List users
  $result = $conn->query("SELECT * FROM users ORDER BY id DESC");
  echo "<table><tr><th>ID</th><th>Username</th><th>Email</th><th>Status</th><th>Role</th><th>Actions</th></tr>";
  while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>{$row['id']}</td>";
    echo "<td>" . htmlspecialchars($row['username']) . "</td>";
    echo "<td>" . htmlspecialchars($row['email']) . "</td>";
    echo "<td>{$row['status']}</td>";
    echo "<td>{$row['role']}</td>";
    echo "<td>
      <a href='?toggle={$row['id']}'>Toggle Status</a> |
      <a href='?delete={$row['id']}' onclick='return confirm(\"Delete user?\")'>Delete</a>
    </td>";
    echo "</tr>";
  }
  echo "</table>";
  ?>
</body>
</html>
