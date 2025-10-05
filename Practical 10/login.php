<?php
session_start();
require "users.php";

$username = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";

if (isset($users[$username]) && $users[$username]["password"] === $password) {
    $_SESSION["user"] = $username;
    $_SESSION["role"] = $users[$username]["role"];
    $_SESSION["last_active"] = time();

    // Optional: Track last login
    $logins = file_exists("last_login.json") ? json_decode(file_get_contents("last_login.json"), true) : [];
    $logins[$username] = date("Y-m-d H:i:s");
    file_put_contents("last_login.json", json_encode($logins, JSON_PRETTY_PRINT));

    header("Location: dashboard.php");
    exit;
} else {
    echo "❌ Invalid credentials.";
}
// Optional: Track last login
$logins = file_exists("last_login.json") ? json_decode(file_get_contents("last_login.json"), true) : [];
$logins[$username] = date("Y-m-d H:i:s");
file_put_contents("last_login.json", json_encode($logins, JSON_PRETTY_PRINT));

?>
