<?php
session_start();

// Timeout: 10 minutes
$timeout = 600;
if (!isset($_SESSION["user"])) {
    header("Location: index.html");
    exit;
}
if (time() - $_SESSION["last_active"] > $timeout) {
    session_destroy();
    header("Location: index.html");
    exit;
}
$_SESSION["last_active"] = time(); // Refresh activity
?>
