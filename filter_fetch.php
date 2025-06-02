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


$query = "SELECT * FROM user_asset_data WHERE user_id = '$user_id' "; // Fetch all assets from the database
$result = mysqli_query($conn, $query);

$data = array();
$category_totals = array(); // To store total value per category


// Calculate total asset value per category
while ($row = mysqli_fetch_assoc($result)) {
    $category = $row['asset_category'];
    $value = (int) $row['asset_value']; // Convert to integer for summation

    if (!isset($category_totals[$category])) {
        $category_totals[$category] = 0;
    }
    $category_totals[$category] += $value;
}

// Reset result pointer and fetch data again
mysqli_data_seek($result, 0);

//  Assign category totals to each asset
while ($row = mysqli_fetch_assoc($result)) {
    $row['category_asset_value'] = $category_totals[$row['asset_category']];

    
    $data[] = $row;
}

echo json_encode($data); // Convert array to JSON
?>