<?php
session_start();
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "User";
?>

<div class="pie-container">
    <div class="heading">
        <h1>Asset Distribution Analysis</h1>
        <h2>Visual Insight into Your Wealth Distribution  </h2>
    </div>
    <figure>
        <div id="pie" class="pie-chart">
        <!-- <div class="tooltip" id="tooltip"></div> -->
        </div>
        <figcaption class="detail-info">
            <div class="detail-info-content"></div>
        </figcaption>
    </figure>
</div>