    <?php
    session_start();
    $username = isset($_SESSION['username']) ? $_SESSION['username'] : "User";
    ?>

    <div class="bar-container" data-username="<?= htmlspecialchars($username) ?>">
        <div class="heading">
            <h1>Financial Growth Insights</h1>
            <h2>Comparative Insights Across Your Assets</h2>
        </div>
        <div class="barchart">
            <!-- <div class="y-axis">
            </div> -->
        </div>      
    </div>