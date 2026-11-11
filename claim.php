<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $item_name = mysqli_real_escape_string($conn, $_POST['itemName']);
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $identify = mysqli_real_escape_string($conn, $_POST['identify']);
    $where_lost = mysqli_real_escape_string($conn, $_POST['where']); 

    $sql = "INSERT INTO claims (item_name, name, email, identification_details, lost_location) 
            VALUES ('$item_name', '$name', '$email', '$identify', '$where_lost')";

    if (mysqli_query($conn, $sql)) {
        echo "Claim Successful";
    } else {
        echo "Database Error: " . mysqli_error($conn);
    }
}
?>