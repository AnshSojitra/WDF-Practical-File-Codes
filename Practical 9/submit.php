<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));

    // Store in text file
    $data = "Name: $name, Email: $email\n";
    file_put_contents("data.txt", $data, FILE_APPEND);

    echo "✅ Thank you, $name! Your data has been saved.";
} else {
    echo "❌ Invalid request.";
}
?>
