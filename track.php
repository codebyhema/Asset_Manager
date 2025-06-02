<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message_login'] = "You must log in first!";
    header("Location: account.php"); // Redirect to login page
    exit();
}



include("connection.php");

// Get logged-in user's ID
$user_id = $_SESSION['user_id'];

if(isset($_POST['addAsset'])){
    $category = $_POST['types-of-assets'];
    $name = $_POST['name-of-asset'];
    $value = $_POST['value-of-asset'];    
    $user_id = $_SESSION['user_id']; //   capture the logged-in user's ID

    // $sql = "INSERT INTO user_asset_data(asset_category, asset_name, asset_value) VALUES ('$category', '$name', $value)";


    $stmt = $conn->prepare("INSERT INTO user_asset_data (user_id, asset_category, asset_name, asset_value) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("issi", $user_id, $category, $name, $value);



    // $conn->query($sql);
    $stmt->execute();
    $stmt->close();
    
    header('Location: track.php');
}

// Update asset value based on selected category and asset name
 
if(isset($_POST['updateAsset'])){
    $category = $_POST['types-of-assets'];
    $name = $_POST['name-of-asset'];
    $newValue = $_POST['value-of-asset']; // Updated value

    // Copy the current asset_value into last_asset_value

    $copyPrevious = $conn->prepare("UPDATE user_asset_data 
                                    SET last_asset_value = asset_value 
                                    WHERE  asset_category = ? AND asset_name = ?");
    $copyPrevious->bind_param("ss", $category, $name);
    $copyPrevious->execute();
    $copyPrevious->close();

    // Update the asset_value with the new value
    $stmt = $conn->prepare("UPDATE  user_asset_data SET asset_value = ?, last_date = NOW() WHERE user_id = ? AND asset_category = ? AND asset_name = ?  ");
    $stmt->bind_param("iiss", $newValue, $user_id, $category, $name);

    $stmt->execute();
    $stmt->close();

    header('Location: track.php');
}
//delete assets by choosing category and name 
if(isset($_POST['deleteAsset'])){
    $category = $_POST['types-of-assets'];
    $name = $_POST['name-of-asset'];

    $stmt = $conn->prepare("DELETE FROM user_asset_data WHERE  user_id = ? AND  asset_category = ? AND asset_name = ?");
    $stmt->bind_param("iss", $user_id,  $category, $name);

    $stmt->execute();
    $stmt->close();

    header('Location: track.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Track</title>
    <!--css-->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages/track.css">
    
</head>
<body>
    <!-- includes header php file -->
    <?php include("component/header.php");    ?>
    <!--main part starts here  -->
    <main>
        <!-- includes sidebar php file -->
        <?php include("component/sidebar.php"); ?>
        <div class="content">
            <div class="head">
                <div class="add button">Add Assets</div>
                <div class="update button">Update Assets</div>
                <div class="delete button">Delete Assets</div>
            </div>
            <div id="toast" class="toast">Notification Message</div>
            <div class="add-assets">    
                <form action="track.php" method="post" id="addAssetForm">
                    <div class="add">
                        <div class="type">
                            <label>Type *</label>
                            <select name="types-of-assets"  class="input-group" required>
                                <option value="" disabled selected>Choose Asset Category</option>
                                <option value="Cash">Cash</option>
                                <option value="Investments">Investments</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Alternative Investments">Alternative Investments</option>
                                <option value="Taxable Fixed Income">Taxable Fixed Income</option>
                                <option value="Non Taxable Fixed Income">Non Taxable Fixed Income</option>
                                <option value="Business Interest">Business Interest</option>
                                <option value="Intellectual Property">Intellectual Property</option>
                                <option value="Insurance Policies">Insurance Policies</option>
                                <option value="Miscellaneous Assets">Miscellaneous Assets</option>
                                <option value="Loans">Loans</option>
                                <option value="Other">Other</option> 
                            </select>
                        </div>
                        <div class="name">
                            <label>Name *</label>
                            <input type="text" class="input-group" name="name-of-asset" placeholder ="Name of Your Asset"autocomplete="off" maxlength = 30 pattern="[A-Za-z\s]{1,30}"  placeholder=" "
                            required 
                            oninput="this.value = this.value.replace(/[^A-Za-z\s]/g, '')">
                        </div>
                        <div class="value">
                                <label>Value *</label>
                                <input type="text" name="value-of-asset" class="input-group" placeholder ="Value of Your Asset (numbers ONLY)"  autocomplete="off" maxlength = 30 oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
                        </div>
                        <input type="submit" value="Add" name="addAsset" class="submit-button">
                    </div>
                </form>
            </div>
            <div class="update-assets">
                <form action="track.php" method="post" id="updateAssetForm">
                    <div class="update">
                        <div class="type">
                                    <label>Type *</label>
                                    <select name="types-of-assets" class="input-group category-assets" required>
                                        <option value="" disabled selected>Choose Asset Category</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Investments">Investments</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Alternative Investments">Alternative Investments</option>
                                        <option value="Taxable Fixed Income">Taxable Fixed Income</option>
                                        <option value="Non Taxable Fixed Income">Non Taxable Fixed Income</option>
                                        <option value="Business Interest">Business Interest</option>
                                        <option value="Intellectual Property">Intellectual Property</option>
                                        <option value="Insurance Policies">Insurance Policies</option>
                                        <option value="Miscellaneous Assets">Miscellaneous Assets</option>
                                        <option value="Loans">Loans</option>
                                        <option value="other">other</option> 
                                    </select>
                        </div> 
                        <div class="name">
                            <label>Name *</label>
                            <select name="name-of-asset" id="nameselect" class="input-group asset-name" required>
                                <option value="" disabled selected>Choose Name of Your Asset</option>
                                <?php
                                    $user_id = $_SESSION['user_id'];

                                    $sql = "SELECT asset_category, asset_name FROM user_asset_data WHERE user_id = $user_id";
                                    $result = $conn->query($sql);
                                    
                                    if ($result->num_rows > 0) {
                                      // output data of each row
                                      while($row = $result->fetch_assoc()) {
                                        

                                        echo "<option value='".$row["asset_name"]."'  data-cat='".$row["asset_category"]."'>".$row["asset_name"]."</option>";
                                      }
                                    } else {
                                      echo "0 results";
                                    }
                                    // $conn->close();
                                ?>
                            </select>
                        </div>
                        <div class="value">
                            <label>Value *</label>
                            <input type="text" class="input-group"  id="valueselect" name="value-of-asset" placeholder ="Update Value of Your Asset (numbers ONLY)" autocomplete="off"  maxlength = 15  oninput="this.value = this.value.replace(/[^0-9]/g, '')" required >
                        </div> 
                        <input type="submit" value="Update"  name="updateAsset" class="submit-button">                           
                    </div>
                </form>
            </div>
            <div class="delete-assets">
                <form action="track.php" method="post" id="deleteAssetForm">
                    <div class="delete">
                        <div class="type">
                            <label>Type *</label>
                            <select name="types-of-assets"  class="input-group category-assets" required>
                                <option value="" disabled selected>Choose Asset Category</option>
                                <option value="Cash">Cash</option>
                                <option value="Investments">Investments</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Alternative Investments">Alternative Investments</option>
                                <option value="Taxable Fixed Income">Taxable Fixed Income</option>
                                <option value="Non Taxable Fixed Income">Non Taxable Fixed Income</option>
                                <option value="Business Interest">Business Interest</option>
                                <option value="Intellectual Property">Intellectual Property</option>
                                <option value="Insurance Policies">Insurance Policies</option>
                                <option value="Miscellaneous Assets">Miscellaneous Assets</option>
                                <option value="Liabilities">Liabilities</option>
                                <option value="Loans">Loans</option>
                                <option value="other">other</option> 
                            </select>
                        </div>
                        <div class="name">
                            <label>Name *</label>
                            <select name="name-of-asset" class="input-group asset-name"  required>
                                <option value="" disabled selected>Choose Name of Your Asset</option>
                                <?php
                                    $sql = "SELECT asset_category, asset_name FROM user_asset_data  WHERE user_id = $user_id";
                                    $result = $conn->query($sql);
                                    
                                    if ($result->num_rows > 0) {
                                        // output data of each row
                                        while($row = $result->fetch_assoc()) {
                                        // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";

                                        echo "<option value='".$row["asset_name"]."' data-cat='".$row["asset_category"]."'>".$row["asset_name"]."</option>";
                                        }
                                    } else {
                                        echo "0 results";
                                    }
                                    $conn->close();
                                ?>
                            </select>
                        </div>
                        <input type="submit" value="Delete" name="deleteAsset" class="submit-button"> 
                    </div>
                </form>
            </div>
        </div>
    </main>
    <!--main part ends here  -->

    <!-- script links -->
    <script src="js/common.js"></script>
    <script src="js/track.js"></script>
</body>
</html>