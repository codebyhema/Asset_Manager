<?php
session_start();
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "User";
?>


<div class="table-wrapper">
    <div class="heading">
        <h1>Asset Portfolio Overview</h1>
        <h2>Overview of Asset Categories</h2>
    </div>
    <div class="table-container">
        <table></table>
    </div>
</div>