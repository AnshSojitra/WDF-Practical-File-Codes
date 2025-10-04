<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));

    $entry = ["name" => $name, "email" => $email];

    $jsonFile = "data.json";
    $existing = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];
    $existing[] = $entry;

    file_put_contents($jsonFile, json_encode($existing, JSON_PRETTY_PRINT));

    echo "✅ Data saved in JSON format.";
}
?>
