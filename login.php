<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['user_id'])) {
    header("Location: index.php"); // Redirect to dashboard
    exit();
}

include "connection.php"; // Database connection



if (isset($_SESSION['error_message'])) {
    echo "<script>alert('" . $_SESSION['error_message'] . "');</script>";
    unset($_SESSION['error_message']); // Clear message after displaying
}

if (isset($_POST['signin_submit'])) {
    $username = htmlspecialchars($_POST['signin_username'], ENT_QUOTES, 'UTF-8');
    $password = $_POST['signin_password'];

    // Fetch user from the database
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id']; // Store user session
        $_SESSION['username'] = $username;
        $_SESSION['success_message'] = "Login successful! Welcome back.";

        if (isset($_POST["remember_me"])) {
            setcookie("user_id", $user["id"], time() + (30 * 24 * 60 * 60), "/");
            setcookie("username", $user["username"], time() + (30 * 24 * 60 * 60), "/");
        }        

        header("Location: index.php"); // Redirect to dashboard
        exit();
    } else {
        $_SESSION['error_message'] = "Invalid username or password!";
        header("Location: account.php"); // Redirect back to login page
        exit();
    }
}
?>
