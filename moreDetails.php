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
    $phone = $_POST['phoneNumber'];
    $companyName = $_POST['company'];
    $address = $_POST['address'];
    $aboutme = $_POST['aboutMe'];    
    $gender = $_POST['gender'];
    $user_id = $_SESSION['user_id']; //   capture the logged-in user's ID

    
    $stmt = $conn->prepare("INSERT INTO more_details (user_phone, user_company, user_address, user_gender,user_aboutme, user_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $phone, $companyName, $address, $gender, $aboutme, $user_id);


    $stmt->execute();
    $stmt->close();
    exit(); // Make sure no further code is executed after the redirection


}
?>