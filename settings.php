<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    header("Location: account.php"); // Redirect to login page
    exit();
}

include 'connection.php'; // Database connection file

$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    // Fetch current email from the database
    $query = "SELECT email FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Display current email
    if ($row = $result->fetch_assoc()) {
        $current_email = htmlspecialchars($row['email']);
    } else {
        $current_email = "Email not found";
    }
} else {
    $current_email = "Not logged in";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <!--css-->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/settings.css">
    
</head>
<body>
    <!-- includes header php file -->
    <?php include("component/header.php");    ?>
    <!--main part starts here  -->
    <main>
        <!-- includes sidebar php file -->
        <?php include("component/sidebar.php"); ?>
        <div class="content">
            <div class="head">
                <div class="acc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-gear  icon" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                        </svg>
                        <span>Settings / Account</span>
                </div>
            </div>
            <div class="dropdown">
                <button class="more-details">
                    <span id="dropdown-btn">Change Password</span>
                    <span id="dropdown-symbol">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" id="chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                    </span>
                </button>
                <div class="dropdown-content">
                    <form method="POST" action="change_password.php"> 
                        <div class="change-password">   
                            <div class="password">
                                <label for="old-password" class="user">Old Password:</label>
                                <input type="password" name="old_password" placeholder="Old Password" class="input" required>
                            </div>
                            <div class="password">
                                <label for="new-password" class="user">New Password:</label>
                                <input type="password" name="new_password" placeholder="New Password" class="input" required>
                            </div>
                            <div class="password">
                                <label for="confirm-password" class="user">New Password Confirmation:</label>
                                <input type="password" name="confirm_password" placeholder="New Password" class="input" required>
                            </div>
                        </div>
                        <button type="submit" name="change_password" class="password-button">Change Password</button>
                    </form>
                </div>

            </div>
            <div class="dropdown">
                <button class="more-details">
                    <span id="dropdown-btn">Notifications </span>
                    <span id="dropdown-symbol">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" id="chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                    </span>
                </button>
                <div class="dropdown-content">
                    <div class="updates">
                        <div class="text">New Feature Updates</div>
                        <label class="container">
                            <input type="checkbox">
                            <div class="checkmark"></div>
                        </label>
                     </div>
                    <div class="updates">
                        <div class="text">Renewal Reminders</div>
                        <label class="container">
                            <input type="checkbox">
                            <div class="checkmark"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="dropdown">
                <button class="more-details">
                    <span id="dropdown-btn">Change Email</span>
                    <span id="dropdown-symbol">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" id="chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                    </span>
                </button>
                <div class="dropdown-content">
                        <form method="POST" action="change_email.php">
                            <div class="pre-info">
                                <div class="h3">Your Current Email:</div>
                                <div class="h4"><?php echo $current_email; ?></div>               
                            </div>
                            <div class="new-email">
                                <label for="new-email" class="user">New Email:</label>
                                <input type="email" name="new_email" placeholder="Abc@.com" class="input" autocomplete ="off"required>
                            </div>
                            <button type="submit" class="email-button">Change Email</button>
                        </form>
                    </div>
                </div>
            
            <div class="acc-btn">
                <div class="delete-acc">
                    <button id="delete_acc"  onclick="confirmDelete(event)">Delete Account</button>
                </div>   
            <div>
                <div class="log-out">
                    <button  onclick="confirmLogout(event)">
                        <span class="log-symbol"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg>
                        </span>
                        <span class="log-text">Log Out</span>
                    </button>
                </div>
            </div>
        </div>

    </main> 
    <!--main part ends here  -->

    <!-- script links -->
    <script src="js/common.js"></script>
    <script src="js/settings.js"></script>
    <script src="js/account.js"></script>
</body>
</html>