<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

include "connection.php";

$user_id = $_SESSION['user_id'];
$query = "SELECT profile_photo FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : "User"; // Fallback

?>

<header>
    <aside>
       <div class="text-asset">AssetManager<small>.com</small>
       </div>
    </aside>
    <div class="headerContainer">
        <div class="toggle">
            <img src="img/icons/toggle-on.svg" style="filter:invert(1);" id="toggle-to-light">
        </div>
        <div class="n-bell">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bell icon" viewBox="0 0 16 16">
                <path  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
            </svg>
        </div>
        <div class="profile-photo" onclick ="window.location.href='profile.php'">
            <img src="<?php echo htmlspecialchars($user['profile_photo'] ?? 'img/default.png'); ?>" 
            alt="Profile Icon">
        </div>
    </div>
</header>   