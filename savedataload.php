
<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include 'connection.php'; // database connection

header('Content-Type: application/json'); // Setting the response type to JSON teling the browser the data is json 

// Check if user_id is set in the session
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Get the logged-in user's ID
$user_id = $_SESSION['user_id'];


$query = "SELECT * FROM savedataload where user_id=$user_id"; // Fetch all assets from the database
$result = mysqli_query($conn, $query);

$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data); // Convert array to JSON
?> 