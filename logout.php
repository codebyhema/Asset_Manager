<?php
// Start the session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Destroy the session
session_unset();   // Clears all session data
session_destroy(); // Ends the session completely

// Clear cookies if 'Remember Me' was checked
if (isset($_COOKIE['user_id'])) {
    setcookie("user_id", "", time() - 3600, "/"); // Expire the cookie
}
if (isset($_COOKIE['username'])) {
    setcookie("username", "", time() - 3600, "/"); // Expire the cookie
}

// Redirect to account.php with a success message
header("Location: account.php?logout=success");
exit();
?>
