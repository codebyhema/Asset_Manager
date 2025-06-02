<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


include "connection.php"; // Database connection

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['profile_photo'])) {
    $target_dir = "uploads/";
    $file_name = "profile_" . $user_id . "_" . basename($_FILES['profile_photo']['name']);
    $target_file = $target_dir . $file_name;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check file type
    $allowed_types = ['jpg', 'jpeg', 'png'];
    if (!in_array($imageFileType, $allowed_types)) {
        echo "<script>alert('Only JPG, JPEG & PNG files are allowed.'); window.location.href='profile.php';</script>";
        exit();
    }

    // Move file and update database
    if (move_uploaded_file($_FILES['profile_photo']['tmp_name'], $target_file)) {
        $update_query = "UPDATE users SET profile_photo = ? WHERE id = ?";
        $stmt = $conn->prepare($update_query);
        $stmt->bind_param("si", $target_file, $user_id);

        if ($stmt->execute()) {
            echo "<script>alert('Profile photo updated successfully!'); window.location.href='profile.php';</script>";
        } else {
            echo "<script>alert('Database error. Try again.'); window.location.href='profile.php';</script>";
        }
    } else {
        echo "<script>alert('Error uploading file. Try again.'); window.location.href='profile.php';</script>";
    }
}
?>
