<?php
$data = json_decode(file_get_contents("data.json"), true);
echo "<h2>Submitted Records</h2><ul>";
foreach ($data as $entry) {
    echo "<li>Name: {$entry['name']}, Email: {$entry['email']}</li>";
}
echo "</ul>";
?>
