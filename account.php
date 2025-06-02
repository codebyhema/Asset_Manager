<?php
include "signup.php";
include "login.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['error_message_login'])) {
    echo "<script>alert('" . $_SESSION['error_message_login'] . "');</script>";
    unset($_SESSION['error_message_login']); // Clear the message after displaying
}
if (isset($_GET['logout']) && $_GET['logout'] === 'success') {
    echo "<script>alert('You have successfully logged out.');</script>";
}

if (isset($_GET['status']) && $_GET['status'] === 'deleted') {
    echo "<script>alert('Your account has been successfully deleted.');</script>";
   
}
if (isset($_GET['status']) && $_GET['status'] === 'password_changed') {
    echo "<script>alert('Password successfully changed! Please log in again.');</script>";
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login-signUp</title>
    <!--css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/account.css">
</head>
<body>
    <div class="wrapper">
        <!-- signin account -->    
        <div class=" form-wrapper login-container">
            <form action= "login.php" method="POST">
                <h1>Welcome</h1>
                <h2>sign into your account</h2>
                <!-- Username Field -->
                <div class="input-group ">
                    <input type="text" name="signin_username"  id="to-label"  autocomplete="off" maxlength="30" 
                    pattern="[A-Za-z\s]{1,30}"  placeholder=" "
                    required 
                    oninput="this.value = this.value.replace(/[^A-Za-z\s]/g, '')">
                    <label for="to-label" class="text" >Username</label>
                    <i class="fa-solid fa-user"></i>
                </div>
                <!-- Password Field -->
                <div class="input-group ">
                    <input  type="password" name="signin_password" id="password" autocomplete="off" maxlength="30"  pattern="^(?=.*[A-Za-z])[A-Za-z0-9@#$!%&*? ]{8,30}$" oninput="this.value = this.value.replace(/[^A-Za-z0-9@#$!%&*? ]/g, '')"  placeholder=" " required >
                    <label for="password">Password</label>
                    <i class="fa-solid fa-lock" id="show-password"></i>
                </div>
                <!-- Remember Me and Forgot Password -->
                <div class="remember-forgot">
                    <label>
                        <input type="checkbox" name="remember_me" id="rememberMe" autocomplete="off">
                        Remember Me
                    </label>
                    <!-- <a href="#">Forgot Password?</a> -->
                </div>
                <!-- Submit Button -->
                <div >
                    <button type="submit" name="signin_submit">Login</button>
                </div>
                <!-- Sign-Up Link -->
                <div class="signup-link">
                    <p>Don't have an account?</p>
                    </br>
                    <a href="#" class="signUpBtn-link">Sign up</a>
                </div>
            </form>
        </div>
    
        <!-- signup account -->
        <div class="form-wrapper signup-container">
            <form action="signup.php" method="POST">
                    <h1>Sign Up</h1>
                    <h2>Create your new account</h2>
                    
                    <!-- Username Field -->
                    <div class="input-group">
                        <input type="text" name="signup_username"  autocomplete="off" maxlength="30" 
                        pattern="[A-Za-z\s]{1,30}"  placeholder=" "
                        required 
                        oninput="this.value = this.value.replace(/[^A-Za-z\s]/g, '')">
                        <label class="text">Username</label>
                        <i class="fa-solid fa-user"></i>
                    </div>
                    
                    <!-- Email Field -->
                    <div class="input-group">
                        <input type="email" name="signup_email"  autocomplete="off" maxlength="30"  placeholder=" " required>
                        <label class="text" >Email</label>
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    
                    <!-- Password Field -->
                    <div class="input-group">
                        <input type="password" name="signup_password" id="signup-password" autocomplete="off" maxlength="30" pattern="^(?=.*[A-Za-z])[A-Za-z0-9@#$!%&*? ]{8,30}$" oninput="this.value = this.value.replace(/[^A-Za-z0-9@#$!%&*? ]/g, '')"
                        placeholder=" " required />
                        <label  class="text">Password</label>
                        <i class="fa-solid fa-lock" id="show-signup-password"></i>
                     </div>
                    
                    <!-- Terms and Conditions Checkbox -->
                    <div class="remember-forgot">
                        <label>
                            <input type="checkbox" name="terms_conditions" autocomplete="off" required>
                            I agree to the terms & conditions
                        </label>
                    </div>
                    
                    <!-- Submit Button -->
                    <div>
                        <button type="submit" name="signup_submit">Sign Up</button>
                    </div>
                    
                    <!-- Sign-In Link -->
                    <div class="signup-link">
                        <p>Already have an account?</p>
                        <br>
                        <a href="#" class="signInBtn-link">Sign In</a>
                   </div>          
            </form>
        </div>
    </div>
<script src="js/account.js"></script>
</body>
</html>