<?php
// Connect to MySQL
$servername = "localhost";
$username = "root";  // change if needed
$password = "";      // change if needed
$database = "gamefusion2_db";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert a new event
if (isset($_POST['add'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $date = $_POST['date'];
    $description = $conn->real_escape_string($_POST['description']);
    $status = $_POST['status'];

    $sql_insert = "INSERT INTO curd_operation (event_name, event_date, description, status)
                   VALUES ('$name', '$date', '$description', '$status')";

    if ($conn->query($sql_insert) === TRUE) {
        $msg = "<p style='color:green;'>Event added successfully!</p>";
    } else {
        $msg = "<p style='color:red;'>Error: " . $conn->error . "</p>";
    }
}

// Update an event
if (isset($_POST['update'])) {
    $id = (int)$_POST['id'];
    $name = $conn->real_escape_string($_POST['name']);
    $date = $_POST['date'];
    $description = $conn->real_escape_string($_POST['description']);
    $status = $_POST['status'];

    $sql_update = "UPDATE curd_operation SET event_name='$name', event_date='$date', 
                   description='$description', status='$status' WHERE id=$id";

    if ($conn->query($sql_update) === TRUE) {
        $msg = "<p style='color:blue;'>Event updated successfully!</p>";
    } else {
        $msg = "<p style='color:red;'>Error: " . $conn->error . "</p>";
    }
}

// Delete an event
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $sql_delete = "DELETE FROM curd_operation WHERE id=$id";

    if ($conn->query($sql_delete) === TRUE) {
        $msg = "<p style='color:red;'>Event deleted successfully!</p>";
    } else {
        $msg = "<p style='color:red;'>Error: " . $conn->error . "</p>";
    }
}

// Fetch all events
$sql_select = "SELECT * FROM curd_operation ORDER BY event_date DESC";
$result = $conn->query($sql_select);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Event Management</title>
    <style>
        table, th, td { border: 1px solid black; border-collapse: collapse; padding: 8px; }
        th { background-color: #f2f2f2; }
        input, textarea, select { margin-bottom: 10px; }
    </style>
</head>
<body>
<h1>Event Management Portal</h1>

<?php if(isset($msg)) echo $msg; ?>

<!-- Add Event Form -->
<h2>Add New Event</h2>
<form method="POST" action="">
    Name: <input type="text" name="name" required><br>
    Date: <input type="date" name="date" required><br>
    Description: <textarea name="description" required></textarea><br>
    Status: 
    <select name="status">
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
    </select><br>
    <input type="submit" name="add" value="Add Event">
</form>

<!-- Event List -->
<h2>All Events</h2>
<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Date</th>
        <th>Description</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
    <?php if ($result->num_rows > 0): ?>
        <?php while($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><?= htmlspecialchars($row['event_name']) ?></td>
                <td><?= $row['event_date'] ?></td>
                <td><?= htmlspecialchars($row['description']) ?></td>
                <td><?= $row['status'] ?></td>
                <td>
                    <a href="?edit=<?= $row['id'] ?>">Edit</a> | 
                    <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Are you sure?')">Delete</a>
                </td>
            </tr>
        <?php endwhile; ?>
    <?php else: ?>
        <tr><td colspan="6">No events found</td></tr>
    <?php endif; ?>
</table>

<!-- Edit Event Form -->
<?php
if (isset($_GET['edit'])) {
    $edit_id = (int)$_GET['edit'];
    $edit_sql = "SELECT * FROM curd_operation WHERE id=$edit_id";
    $edit_result = $conn->query($edit_sql);
    if ($edit_result->num_rows == 1) {
        $edit_event = $edit_result->fetch_assoc();
?>
<h2>Edit Event (ID <?= $edit_event['id'] ?>)</h2>
<form method="POST" action="">
    <input type="hidden" name="id" value="<?= $edit_event['id'] ?>">
    Name: <input type="text" name="name" value="<?= htmlspecialchars($edit_event['event_name']) ?>" required><br>
    Date: <input type="date" name="date" value="<?= $edit_event['event_date'] ?>" required><br>
    Description: <textarea name="description" required><?= htmlspecialchars($edit_event['description']) ?></textarea><br>
    Status: 
    <select name="status">
        <option value="Open" <?= $edit_event['status']=='Open'?'selected':'' ?>>Open</option>
        <option value="Closed" <?= $edit_event['status']=='Closed'?'selected':'' ?>>Closed</option>
    </select><br>
    <input type="submit" name="update" value="Update Event">
</form>
<?php 
    } else {
        echo "<p style='color:red;'>Event not found</p>";
    }
}
$conn->close();
?>
</body>
</html>