<?php
require 'config.php';

$search = $_GET['q'] ?? '';
$stmt = $pdo->prepare("SELECT * FROM students WHERE name LIKE ?");
$stmt->execute(["%$search%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($results as $student) {
    echo "<p>{$student['name']} - {$student['email']} - {$student['course']}</p>";
}
?>
