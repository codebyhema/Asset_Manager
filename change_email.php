<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

include 'connection.php'; // Database connection file


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'] ?? null;
    $new_email = filter_var($_POST['new_email'], FILTER_SANITIZE_EMAIL);

    if ($user_id && filter_var($new_email, FILTER_VALIDATE_EMAIL)) {
        $update_query = "UPDATE users SET email = ? WHERE id = ?";
        $stmt = $conn->prepare($update_query);
        $stmt->bind_param("si", $new_email, $user_id);

        if ($stmt->execute()) {
            echo "<script>alert('Email successfully updated!'); window.location.href='settings.php';</script>";
        } else {
            echo "<script>alert('Error updating email. Please try again.');</script>";
        }
    } else {
        echo "<script>alert('Invalid email address.');</script>";
    }
}
?>
