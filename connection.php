<?php
$servername="localhost";
$username="root";
$password="";
$database="asset_manager_db";

// Creating a connection to the database using mysqli
$conn=new mysqli($servername,$username,$password,$database);

// checking connection

if($conn->connect_error){
   die("connection failed:".$conn->connect_error);
}

?>






