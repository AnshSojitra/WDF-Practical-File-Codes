<?php
session_start();

// Database connection
$conn = new mysqli("localhost", "root", "", "gamefusion2_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// --------- LOGIN SECTION ----------
if (!isset($_SESSION['admin'])) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND role='admin'");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            // ⚡ For demo: plain password check (replace with password_verify() later)
            if ($password === $row['password']) {
                $_SESSION['admin'] = true;
                header("Location: admin_dashboard.php");
                exit();
            } else {
                echo "❌ Invalid password";
            }
        } else {
            echo "❌ Not an admin account.";
        }
    }

    // Show login form
    ?>
    <h2>Admin Login</h2>
    <form method="post">
        <input type="email" name="email" placeholder="Admin Email" required><br><br>
        <input type="password" name="password" placeholder="Password" required><br><br>
        <button type="submit">Login</button>
    </form>
    <?php
    exit();
}

// --------- DELETE USER ----------
if (isset($_GET['delete'])) {
    $id = (int) $_GET['delete'];
    $conn->query("DELETE FROM users WHERE id=$id");
    header("Location: admin_dashboard.php");
    exit();
}

// --------- DISPLAY USERS ----------
$result = $conn->query("SELECT id, email, role, created_at FROM users");
?>
<h2>Admin Dashboard - Manage Users</h2>
<table border="1" cellpadding="10">
<tr>
    <th>ID</th>
    <th>Email</th>
    <th>Role</th>
    <th>Created</th>
    <th>Action</th>
</tr>
<?php while ($row = $result->fetch_assoc()) { ?>
<tr>
    <td><?= $row['id'] ?></td>
    <td><?= $row['email'] ?></td>
    <td><?= $row['role'] ?></td>
    <td><?= $row['created_at'] ?></td>
    <td><a href="admin_dashboard.php?delete=<?= $row['id'] ?>" onclick="return confirm('Delete this user?')">Delete</a></td>
</tr>
<?php } ?>
</table>
<a href="logout.php">Logout</a>
<?php
$conn->close();
?>
