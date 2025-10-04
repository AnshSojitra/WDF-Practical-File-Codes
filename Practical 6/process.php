<?php
function sanitize($data) {
  return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = sanitize($_POST["name"]);
  $email = sanitize($_POST["email"]);
  $course = sanitize($_POST["course"]);
  $remember = isset($_POST["remember"]);

  if ($name && $email && $course) {
    // Store data in a file
    $entry = "$name | $email | $course\n";
    file_put_contents("registrations.txt", $entry, FILE_APPEND);

    // Set cookie if Remember Me is checked
    if ($remember) {
      setcookie("student_name", $name, time() + (86400 * 7)); // 7 days
    }

    header("Location: success.php");
    exit();
  } else {
    header("Location: error.php");
    exit();
  }
}
?>
