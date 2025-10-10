<?php
session_start();

$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "gamefusion2_db";

$conn = new mysqli($servername, $username, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("Database Connection failed: " . $conn->connect_error);
}

$message = "";
$loggedOut = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($email !== "" && $password !== "") {
        $stmt = $conn->prepare("SELECT * FROM logins WHERE email=? AND password=?");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            // Destroy session and confirm logout
            session_unset();
            session_destroy();
            $loggedOut = true;
        } else {
            $message = "❌ Incorrect Email or Password.";
        }

        $stmt->close();
    } else {
        $message = "❌ Please enter both email and password.";
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game Fusion - Logout</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #0f172a;
      color: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .logout-container {
      background-color: #111827;
      border: 1px solid #1f2937;
      border-radius: 1rem;
      padding: 2rem;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
    .logout-container h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #06b6d4;
      margin-bottom: 1rem;
    }
    .logout-container p {
      font-size: 1rem;
      color: #d1d5db;
      margin-bottom: 1.5rem;
    }
    .logout-container p span {
      font-weight: 600;
      color: #f9fafb;
    }
    .input-field {
      width: 100%;
      padding: 0.75rem 1rem;
      margin: 0.5rem 0;
      background-color: #1f2937;
      color: #fff;
      border: 1px solid #374151;
      border-radius: 0.5rem;
      outline: none;
      transition: 0.3s ease;
    }
    .input-field:focus {
      border-color: #06b6d4;
      box-shadow: 0 0 0 2px #06b6d4;
    }
    .btn-primary {
      background-color: #0891b2;
      color: #fff;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
      border: none;
      cursor: pointer;
      margin-top: 1rem;
    }
    .btn-primary:hover {
      background-color: #0e7490;
    }
    .error-msg {
      color: #f87171;
      margin-bottom: 1rem;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="logout-container">
    <?php if ($loggedOut): ?>
      <h1>You have been logged out</h1>
      <p>Thank you for visiting <span>Game Fusion</span>. See you soon 🎮</p>
      <a href="login.html" class="btn-primary">Login Again</a>
    <?php else: ?>
      <h1>Confirm Logout</h1>
      <p>Please enter your email and password to logout securely.</p>

      <?php if ($message !== ""): ?>
        <p class="error-msg"><?= $message ?></p>
      <?php endif; ?>

      <form method="POST" action="">
        <input type="email" name="email" class="input-field" placeholder="Enter your email" required>
        <input type="password" name="password" class="input-field" placeholder="Enter your password" required>
        <button type="submit" class="btn-primary">Logout</button>
      </form>
    <?php endif; ?>
  </div>
</body>
</html>
