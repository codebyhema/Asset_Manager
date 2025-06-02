<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


include "connection.php"; // Database connection

$userId = $_SESSION['user_id']; 

// Delete user data from the database
$sql = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    // Sign out the user
    session_unset();
    session_destroy();

    // Redirect to confirmation page
    header("Location: account.php?status=deleted");
    exit();
} else {
    echo "Error deleting account. Please try again.";
}
?>
