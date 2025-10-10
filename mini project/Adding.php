<?php
include 'dp.php';
$id = $_GET['email'];
$sql = "DELETE FROM events WHERE id=$email";

if ($conn->query($sql) === TRUE) {
    header("Location: events.php?msg=Event deleted successfully!");
} else {
    header("Location: events.php?msg=Error deleting event!");
}
?>
