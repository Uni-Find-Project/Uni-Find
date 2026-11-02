<?php
include 'db.php';

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$new_password = isset($_POST['password']) ? $_POST['password'] : '';

if(empty($email) || empty($new_password)) {
    echo "Error: Email and password fields cannot be empty.";
    exit;
}

// Aluth password eka hash kirima (Security eka wadi kirimata)
$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

// Database eke password eka update kirima
$sql = "UPDATE users SET password = ? WHERE email = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo "Error: Database query failed.";
    exit;
}

$stmt->bind_param("ss", $hashed_password, $email);
$stmt->execute();

// Wenaskam sidu unada kiyala balima
if ($stmt->affected_rows > 0) {
    echo "Successful";
} else {
    echo "Error: Email not found or password is the same.";
}

$stmt->close();
$conn->close();
?>