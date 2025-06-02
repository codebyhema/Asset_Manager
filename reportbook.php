<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    header("Location: account.php"); // Redirect to login page
    exit();
}


// add widget and save in database code here



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReportBook</title>
    <!--css-->

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/reportbook.css">
   
</head>
<body>
    <!-- includes header php file -->
    <?php include("component/header.php");?>
    <!--main part starts here  -->
    <main>
        <!-- includes sidebar php file -->
    <?php include("component/sidebar.php"); ?>
    <!-- main section contenet starts here -->
    <div class="content">
        <div class="head">
            <button id="add-widgets">+ Add widgets</button>    
            <button id="save-report" onClick="window.print()">Save PDF</button>    
        </div>
        <div class="report">
            <div id="box-container"><!-- boxs will be added here --></div>
        </div>
    </div>
    </main>
    <!--main part ends here  -->
    <!-- script links -->
    <script src="js/common.js"></script>
    <script src="js/reportbook.js"></script>
    


</body>
</html>