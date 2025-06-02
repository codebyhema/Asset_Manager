<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    echo "<script>alert('" . $_SESSION['error_message_login'] . "');</script>";
    header("Location: account.php"); // Redirect to login page
    exit();
}


include "connection.php"; // Database connection

// Fetch user details from the database
$user_id = trim($_SESSION['user_id']);
$query = "SELECT username FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $username = htmlspecialchars($user['username']); // Prevents XSS attacks
} else {
    $username = "User"; // Fallback if no username is found
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DashBoard</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/dashboard.css">
</head>
<body>
    <?php include("component/header.php"); ?>
   

    <main>
        <?php include("component/sidebar.php"); ?>
       

        <div class="content">
            <div class="welcome-message">   
                <h1 class="greetings"><?php echo $username;?>! New here? Don’t worry! Follow these steps to get started 
                📝</h1>
            </div>
            <div class="login">
                <span>Step 1:<br>Enter your email and password to log in. If you're new, sign up first!</span>
                <img src="img/login.png" alt="login img">
                <img src="img/signup.PNG" alt="login img">
            </div>
            <div class="login">
                <span>Step 2:<br>Click on 'TRACK' in the sidebar, then fill in the asset details like type,name and value.</span>
                <img src="img/add_asset.png" alt="track img">
            </div>
            <div class="login">
                <span>Step 3:<br>Go to the 'REPORTBOOK' section to view your asset distribution in charts.</span>
                <img src="img/report.png" alt="track img">
            </div>
            <div class="login">
                <span>Step 4:<br>Edit your name, email, profile photo and other information to keep your account up to date.</span>
                <img src="img/profile.png" alt="track img">
            </div>
            <div class="login">
                <span>Step 5:<br>Manage your account settings, including theme, notifications, and password preferences for a personalized experience.</span>
                <img src="img/settings.png" alt="settings img">
            </div>  
            <div class="login">
                <span>Step 6:<br>View your current subscription plan, renewal date, and available offers to stay updated on your membership status.</span>
                <img src="img/myplan.png" alt="plan img">
            </div>

        </div>
        
    </main>

    <script src="js/common.js"></script>
</body>
</html>
