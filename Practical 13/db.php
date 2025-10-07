<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "securedb"; // ← make sure this database exists in phpMyAdmin

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
