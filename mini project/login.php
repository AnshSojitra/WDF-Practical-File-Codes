<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    // Sanitize inputs
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $password = trim($_POST['password'] ?? '');

    // Validation: Check if fields are not empty and email is valid
    if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) && $password !== '') {
        
        // ✅ Hash the password before storing
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Save email + hashed password in a text file
        $file = fopen("login.txt", "a");
        fwrite($file, "Email: $email | Password Hash: $hashedPassword\n");
        fclose($file);

        // Database connection
        $servername = "localhost";
        $username = "root";  
        $dbpassword = "";     
        $dbname = "gamefusion2_db";

        $conn = new mysqli($servername, $username, $dbpassword, $dbname);

        if ($conn->connect_error) {
            die("Database Connection failed: " . $conn->connect_error);
        }

        // Create table if not exists
        $createTable = "CREATE TABLE IF NOT EXISTS logins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $conn->query($createTable);

        // Insert into database (store hashed password)
        $stmt = $conn->prepare("INSERT INTO logins (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashedPassword);

        if ($stmt->execute()) {
            // ✅ Redirect to Dashboard after successful login
            header("Location: DashBoard.html");
            exit();
        } else {
            echo "❌ Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        echo "❌ Please enter a valid email and password.";
    }
} else {
    echo "❌ Invalid request method. Please use the login form.";
}
?>
