<?php
include('connection.php');//includes connection file

//handle sign-in form
if(isset($_POST['signin_submit'])){
    $signin_username=$_POST['signin_username'];
    $signin_password=$_POST['signin_password'];

    $query="SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt=$conn->prepare($query);
    $stmt->bind_param("ss", $signin_username, $signin_password);
    $stmt->execute();
    $result=$stmt->get_result();

    if($result->num_rows>0){
        echo"<script>alert('Sign-in is successful!');</script>";
        header("Location:index.php");
        exit();
    }
    else{
        echo"<script>alert('Invalid username or password !');</script>";
    } 
    $stmt->close();   


}

?>