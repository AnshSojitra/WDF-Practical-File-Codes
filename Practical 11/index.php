<?php
require 'config.php';
$students = $pdo->query("SELECT * FROM students ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student Portal</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Add Student</h2>
<form method="POST" action="insert.php">
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="text" name="course" placeholder="Course" required>
    <button type="submit">Add</button>
</form>

<h2>Search Student</h2>
<form method="GET" action="search.php">
    <input type="text" name="q" placeholder="Search by name">
    <button type="submit">Search</button>
</form>

<h2>Student List</h2>
<ul>
<?php foreach ($students as $s): ?>
    <li>
        <?= htmlspecialchars($s['name']) ?> - <?= htmlspecialchars($s['email']) ?> - <?= htmlspecialchars($s['course']) ?>
        <a href="delete.php?id=<?= $s['id'] ?>">Delete</a>
    </li>
<?php endforeach; ?>
</ul>
</body>
</html>
