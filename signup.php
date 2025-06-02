<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['user_id'])) {
    header("Location: index.php"); // Redirect to dashboard
    exit();
}

include "connection.php"; // Include database connection

if (isset($_SESSION['error_message'])) {
    echo "<script>alert('" . $_SESSION['error_message'] . "');</script>";
    unset($_SESSION['error_message']); // Clear message after displaying
}

if (isset($_POST['signup_submit'])) {
    $username = htmlspecialchars($_POST['signup_username'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['signup_email'], ENT_QUOTES, 'UTF-8');
    $password = password_hash($_POST['signup_password'], PASSWORD_DEFAULT); // Hash password

     // Check if email already exists in the database
     $check_email = $conn->prepare("SELECT id FROM users WHERE email = ?");
     $check_email->bind_param("s", $email);
     $check_email->execute();
     $check_email->store_result();
 
     if ($check_email->num_rows > 0) {  // If email already exists
         $_SESSION['error_message'] = "Email already in use. Try another!";
         header("Location: account.php"); // Redirect back to signup page
         exit();
     }
     
     $check_email->close(); // Close previous statement

    // Insert user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);


    
    if ($stmt->execute()) {
        // Auto-login after signup
        $_SESSION['user_id'] = $stmt->insert_id;
        $_SESSION['username'] = $username;
        $_SESSION['success_message'] = "Signup successful! Welcome to the dashboard.";

        header("Location: index.php"); // Redirect to dashboard
        exit();
    } else {
        $_SESSION['error_message'] = "Signup failed. Try again!";
        header("Location: account.php"); // Redirect back to signup page
        exit();
    }
}
?>
