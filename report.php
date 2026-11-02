<?php
include 'db.php'; 

$type = isset($_POST['type']) ? $_POST['type'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$category = isset($_POST['category']) ? $_POST['category'] : '';
$location = isset($_POST['location']) ? $_POST['location'] : '';
$date = isset($_POST['date']) ? $_POST['date'] : '';
$desc = isset($_POST['desc']) ? $_POST['desc'] : '';


$img = ''; 
if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
    
    $uploadDir = 'uploads/'; 
    
    
    $fileName = time() . '_' . basename($_FILES['img']['name']); 
    $targetFilePath = $uploadDir . $fileName;
    
    
    if (move_uploaded_file($_FILES['img']['tmp_name'], $targetFilePath)) {
        $img = $targetFilePath; 
    }
}
// ----------------------------------------------------

$sql = "INSERT INTO items (name, type, location, item_date, category, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Database Error: " . $conn->error);
}

$stmt->bind_param("sssssss", $name, $type, $location, $date, $category, $desc, $img);

if ($stmt->execute()) {
    echo "Successful";
} else {
    echo "Execute Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>