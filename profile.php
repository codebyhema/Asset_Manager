<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include "connection.php"; // Database connection

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    header("Location: account.php"); // Redirect to login page
    exit();
}
// Fetch user data from the database
$user_id = $_SESSION['user_id'];
$query = "SELECT profile_photo FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <!--css-->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/profile.css">
    
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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-person-circle icon" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <span>Profile / Account</span>
        </div>
        <span class="greetings">Hello, <?php echo $username;?>!</span>
        </div>
    <div class="profile-img-btn">
        <div class="photo">            
            <img src="<?php echo htmlspecialchars($user['profile_photo'] ?? 'img/default.png'); ?>" 
                alt="Profile Photo" 
                class="profile-photo-img">

        </div>
        <div class="button">
            <form action="upload_photo.php" method="POST" enctype="multipart/form-data">
                    <label class="upload-label">
                    <input type="file" name="profile_photo" accept="image/*" onchange="this.form.submit()" hidden>    
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    <span>Change Photo</span>
                    </label>
             </form>
        </div>
    </div>
    <div class="user-info">
        <div class="input-group ">
            <label for="user-label" class="user" >Username:</label>
            <input type="text" name="username" placeholder="username" class="input-field"  autocomplete ="off"maxlength="30" 
            pattern="[A-Za-z\s]{1,30}" 
            required 
            oninput="this.value = this.value.replace(/[^A-Za-z\s]/g, '')">
        </div>
        <div class="input-group ">
            <label for="user-label" class="user" >Email:</label>
            <input type="email" name="username" placeholder="Email@.com"  class="input-field"  autocomplete ="off" maxlength="30" required>
        </div>
        <div class="plan-group">
            <label for="user-label" class="user" >Current Plan:</label>
            <div class="current-plan">Basic Plan</div>
            <span class="expiry-date">expiry:31st March,2025</span>
            <button class="upgrade-btn" onclick ="window.location.href='myPlan.php'">upgrade</button>
        </div>
        <div class="dropdown">
                <button class="more-details">
                    <span id="dropdown-btn">More Details </span>
                    <span id="dropdown-symbol">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" id="chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </span>
                </button>
                <form id="moreDetails">
                    <div class="dropdown-content">
                        <div class="input-group details">
                            <label for="user-label" class="user" >Number:</label>
                            <input type="tel" name="phoneNumber" placeholder="Enter your number"  class="input-field"  autocomplete ="off" maxlength="10" 
                                pattern="[0-9]{10}" 
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"required>
                        </div>
                        <div class="input-group details">
                            <label for="user-label" class="user" >Company Name:</label>
                            <input type="text" name="company" placeholder="XYZ company" class="input-field"  autocomplete ="off"  maxlength = "30"required>
                        </div>
                        <div class="input-group details">
                            <label for="user-label" class="user" >Address:</label>
                            <textarea id="address" name="address" placeholder="Enter your address" class="input-field large-field" maxlength = "120"required></textarea>
                        </div>
                        <div class="input-group details">
                            <label for="user-label" class="user" >About me:</label>
                            <textarea name="aboutMe" placeholder="About Me" class="input-field large-field"  maxlength = "120" required></textarea>
                        </div>
                        <div class="gender-selection">
                            <label for="gender" id="choose">Choose Gender:</label>
                            <div class="options">
                                <div>
                                    <input type="radio" id="male" name="gender" value="male">
                                    <label for="male">Male</label>
                                </div>
                                <div>
                                    <input type="radio" id="female" name="gender" value="female">
                                    <label for="female">Female</label>
                                </div>
                                <div>
                                    <input type="radio" id="other" name="gender" value="other">
                                    <label for="other">Other</label>
                                </div>
                            </div>
                        </div>
                        <button type ="submit"class="detail-button">add details</button>
                    </div>  
                </form>
        </div>
    


    </main>
    <!--main part ends here  -->

    <!-- script links -->
    <script src="js/common.js"></script>
    <script src="js/profile.js"></script>
</body>
</html>