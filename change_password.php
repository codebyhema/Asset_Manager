<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

include 'connection.php'; // Database connection file

if (isset($_POST['change_password'])) {
    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    // Fetch current user's password from database
    $user_id = $_SESSION['user_id']; 
    $query = "SELECT password FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($stored_password);
    $stmt->fetch();
    $stmt->close();

    // Check if the old password matches
    if (!password_verify($old_password, $stored_password)) {
        echo "<script>alert('Old password is incorrect.'); window.location.href='settings.php';</script>";
        exit();
    }

    // Check if new passwords match
    if ($new_password !== $confirm_password) {
        echo "<script>alert('New password confirmation does not match.'); window.location.href='settings.php';</script>";
        exit();
    }

    // Hash the new password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    // Update the password in the database
    $update_query = "UPDATE users SET password = ? WHERE id = ?";
    $update_stmt = $conn->prepare($update_query);
    $update_stmt->bind_param("si", $hashed_password, $user_id);

    if ($update_stmt->execute()) {
        session_start();
        session_unset();
        session_destroy();
        header("Location: account.php?status=password_changed");
        exit();
        
    } else {
        echo "<script>alert('Failed to change password. Please try again.'); window.location.href='settings.php';</script>";
    }

    $update_stmt->close();
}
?>
