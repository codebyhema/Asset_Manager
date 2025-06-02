<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    header("Location: account.php"); // Redirect to login page
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPlan</title>
    <!--css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/myplan.css">
    
    
</head>
<body>
    <!-- includes header php file -->
    <?php include("component/header.php");    ?>
    <!--main part starts here  -->
    <main>
        <!-- includes sidebar php file -->
    <?php include("component/sidebar.php"); ?>
    
    <div class="content">
        <div class="blur-me">
            <div class="head">
                <div class="acc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-tag icon" viewBox="0 0 16 16">
                    <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/>
                    <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/>
                    </svg>
                    <span>MyPlan / Account</span>               
                </div>
            </div>
            <div class="heading">
                <div class="heading-text">
                    <span>Upgrade your plan</span>
                </div>
                <div class="heading-money">
                    <label class="container">
                        <input type="checkbox" id="check">
                        <div class="checkmark"></div>
                        <span>INR</span>
                        <span>USD</span>
                    </label>
                </div>
            </div>
            <div class="plans">
                <div class="basic version">
                    <h2>Basic</h2>
                    <div class="info">
                        <div class="symbol">₹</div>
                        <div class="price">0</div>
                        <div class="currency">INR/Year</div>
                    </div>
                    <div class="perks">
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">FREE.</div>                       
                        </div>
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">View assets in table or bar chart format only.</div>                        
                        </div>
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">Add up to 10 Assets.</div>
                        </div>
                        <div class="benefit">
                            <div class="crossicon"></div>
                            <div class="description">No PDF exports for reports.</div>                       
                        </div>
                    </div>
                    <div class="button">
                        <button class=" free-plan">Upgrade to pro version</button>
                    </div> 
                </div>
                <div class="pro version ">
                    <h2>Pro</h2>
                    <div class="info">
                        <div class="symbol">₹</div>
                        <div class="price">625,000</div>
                        <div class="currency">INR/Year</div>
                    </div>  
                    <div class="perks">
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">everything in Basic.</div>                      
                        </div>
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">Add unlimited assets.</div>                      
                        </div>
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">Access to pie charts, bar charts, and advanced visualizations.</div>                  
                        </div>
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">Generate PDF reports for detailed insights.</div>             
                        </div>
                        <div class="benefit">
                            <div class="checkicon"></div>
                            <div class="description">Get priority customer support.</div>                      
                        </div>
                    </div>
                    <div class="button">
                        <button class=" get-version"type="submit" >Speak To Us</button>
                    </div> 
                </div>
            </div>
        </div>    
        <form id="meetingform">
            <div class="form" id="form-container">
                <div  id="form-content">
                    <h2>Speak To Us</h2>
                    <div class="input-group">
                        <input type="text" name="name" placeholder ="Name"  id="name-label"  autocomplete="off" maxlength="30" 
                        pattern="[A-Za-z\s]{1,30}" 
                        required 
                        oninput="this.value = this.value.replace(/[^A-Za-z\s]/g, '')">
                        <label for="to-label" class="text" >Enter your name</label>
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="input-group">
                        <span style="text-align:center;">+91</span>
                        <input type="tel"  name="phone" id="phone-label"  class="number" autocomplete="off" maxlength="10" 
                        pattern="[0-9]{10}" 
                        oninput="this.value = this.value.replace(/[^0-9]/g, '')"required>                          
                        <label for="to-label"  >Enter your phone Number</label>
                        <i class="fa-solid fa-phone"></i>
                    </div>
                    <label for="calltime">choose time slot for scheduling meeting.</label>
                    <div class="slot">
                        <label>
                            <input type="radio" name="calltime" value="10-2">
                            <span>10AM - 2PM</span>
                        </label>
                        <label>
                            <input type="radio" name="calltime" value="2-6">
                            <span>2PM - 6PM</span>
                        </label>
                        <label>
                            <input type="radio" name="calltime" value="6-9">
                            <span>6PM - 9PM</span>
                        </label>
                        <label>
                            <input type="radio" name="calltime" value="anytime" checked>
                            <span>Anytime</span>
                        </label>
                    </div>                        
                    <input id="call-button" type="submit" name="addMeeting" value = "call">
                </div>                       
                <div id="thank-you" style="display:none;">
                    <div class="checkicon"></div>
                    <h2>Thank You! </h2>
                    <p>We'll get back to you shortly.</p>
                </div>
            </div>
        </form>
    </div>
    
 


    </main>
    <!--main part ends here  -->

    <!-- script links -->
    <script src="js/common.js"></script>
    <script src="js/myplan.js"></script>
</body>
</html>