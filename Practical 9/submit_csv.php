<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));

    $file = fopen("data.csv", "a");
    fputcsv($file, [$name, $email]);
    fclose($file);

    echo "✅ Data saved in CSV format.";
}
?>
