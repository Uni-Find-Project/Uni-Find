<?php
include 'db.php'; 

header('Content-Type: text/plain');

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if ($id > 0) {
    $sql = "DELETE FROM items WHERE id = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        echo "Error: Database Error. " . $conn->error;
        exit;
    }

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Successful";
        } else {
            echo "Error: Item not found.";
        }
    } else {
        echo "Error: Execute Failed. " . $stmt->error;
    }
    
    $stmt->close();
} else {
    echo "Error: Invalid ID.";
}

$conn->close();
?>