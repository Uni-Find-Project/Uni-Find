<?php
require 'db.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = mysqli_real_escape_string($conn, $_POST['type']);
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $category = mysqli_real_escape_string($conn, $_POST['category']);
    $location = mysqli_real_escape_string($conn, $_POST['location']);
    $item_date = mysqli_real_escape_string($conn, $_POST['date']);
    $description = mysqli_real_escape_string($conn, $_POST['desc']);
    
    $image = ""; 

    $sql = "INSERT INTO items (type, name, category, location, item_date, description, image) 
            VALUES ('$type', '$name', '$category', '$location', '$item_date', '$description', '$image')";
    
    if (mysqli_query($conn, $sql)) {
        echo "Report Successful";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>