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

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $category = isset($_POST['category']) ? $_POST['category'] : '';
    $assettype = isset($_POST['assettype']) ? $_POST['assettype'] : '';
    $pietype = isset($_POST['pietype']) ? $_POST['pietype'] : '';
    $bartype = isset($_POST['bartype']) ? $_POST['bartype'] : '';
    $multiOptions = isset($_POST['multiOptions']) ? $_POST['multiOptions'] : '';
    $multiOptionsString = isset($_POST['multiOptions']) ? implode(",", $multiOptions) : '';
    $nettype = isset($_POST['nettype']) ? $_POST['nettype'] : '';
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $widgetid = isset($_POST['widgetid']) ? $_POST['widgetid'] : '';

    // Convert array to string (comma-separated)
    if(!isset($_POST['widgetid'])){

      if(!isset($_POST['id'])){
        $stmt = $conn->prepare("INSERT INTO savedataload (user_id, category, assettype, pietype, bartype, barcheckbox, nettype) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssss", $user_id,$category, $assettype, $pietype, $bartype, $multiOptionsString, $nettype);
        
        // $conn->query($sql);
        $stmt->execute();
        $stmt->close();
      }
      else{
        $stmt = $conn->prepare("UPDATE savedataload SET category=?, assettype=?, pietype=?, bartype=?, barcheckbox=?, nettype=? WHERE id=? AND user_id=?");
        $stmt->bind_param("ssssssii", $category,$assettype,$pietype,$bartype,$multiOptionsString,$nettype,$id,$user_id);
        $stmt->execute();
        $stmt->close();
      }
    }
    else{
          $stmt = $conn->prepare("DELETE FROM savedataload WHERE id=? AND user_id=?");
          $stmt->bind_param("ii", $widgetid,$user_id);
          $stmt->execute();
          $stmt->close();
    }
  }

?>