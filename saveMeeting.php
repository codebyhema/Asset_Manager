<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    header("Location: account.php"); // Redirect to login page
    exit();
}

include "connection.php"; // Database connection

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $calltime = $_POST['calltime'];    
    $user_id = $_SESSION['user_id']; //   capture the logged-in user's ID

    
    $stmt = $conn->prepare("INSERT INTO user_meeting (user_idname, user_phone, user_calltime, user_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $name, $phone, $calltime, $user_id);


    $stmt->execute();
    $stmt->close();
    // header('Location: myPlan.php');
    exit(); // Make sure no further code is executed after the redirection


}
?>