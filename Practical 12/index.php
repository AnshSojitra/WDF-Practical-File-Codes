<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Event Manager</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>Event Manager</h2>

  <?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $desc = $_POST['description'];
    $status = $_POST['status'];
    $poster = '';

    if (!empty($_FILES['poster']['name'])) {
      $poster = 'upload/' . basename($_FILES['poster']['name']);
      move_uploaded_file($_FILES['poster']['tmp_name'], $poster);
    }

    $stmt = $conn->prepare("INSERT INTO events (title, description, status, poster) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $desc, $status, $poster);
    echo $stmt->execute() ? "<p class='success'>✅ Event added successfully!</p>" : "<p class='error'>❌ Failed to add event.</p>";
  }

  if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $stmt = $conn->prepare("DELETE FROM events WHERE id=?");
    $stmt->bind_param("i", $id);
    echo $stmt->execute() ? "<p class='success'>🗑️ Event deleted.</p>" : "<p class='error'>❌ Deletion failed.</p>";
  }
  ?>

  <form method="POST" enctype="multipart/form-data">
    <input type="text" name="title" placeholder="Event Title" required>
    <textarea name="description" placeholder="Description" required></textarea>
    <select name="status">
      <option value="open">Open</option>
      <option value="closed">Closed</option>
      <option value="cancelled">Cancelled</option>
    </select>
    <input type="file" name="poster" accept="image/*">
    <button type="submit">Add Event</button>
  </form>

  <h3>📅 Existing Events</h3>
  <?php
  $result = $conn->query("SELECT * FROM events ORDER BY id DESC");
  while ($row = $result->fetch_assoc()) {
    echo "<div class='event'>";
    echo "<h4>" . htmlspecialchars($row['title']) . "</h4>";
    echo "<p>" . nl2br(htmlspecialchars($row['description'])) . "</p>";
    echo "<p>Status: <strong>" . htmlspecialchars($row['status']) . "</strong></p>";
    if (!empty($row['poster'])) {
      echo "<img src='" . htmlspecialchars($row['poster']) . "' alt='Poster'>";
    }
    echo "<p><a href='?delete=" . $row['id'] . "' onclick='return confirm(\"Delete this event?\")'>Delete</a></p>";
    echo "</div>";
  }
  ?>
</body>
</html>
