<?php
include 'db.php';

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$currentPassword = isset($_POST['currentPassword']) ? $_POST['currentPassword'] : '';
$newPassword = isset($_POST['newPassword']) ? $_POST['newPassword'] : '';

if(empty($email) || empty($currentPassword) || empty($newPassword)) {
    echo "All fields are required.";
    exit;
}

// ඩේටාබේස් එකෙන් යුසර්ගේ දත්ත ලබා ගැනීම
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if($row = $result->fetch_assoc()) {
    $dbPassword = $row['password'];

    // මෙහිදී පාස්වර්ඩ් එක Hashing කර තිබේද නැද්ද යන්න දෙකම වැඩ කිරීමට සකසා ඇත
    $isPasswordMatch = false;

    if (password_verify($currentPassword, $dbPassword)) {
        $isPasswordMatch = true; // Hashing කර තිබේ නම්
    } else if ($currentPassword === $dbPassword) {
        $isPasswordMatch = true; // සාමාන්‍ය Text ලෙස තිබේ නම්
    }

    if($isPasswordMatch) {
        // අලුත් පාස්වර්ඩ් එක Hashing කර හෝ එලෙසම Update කිරීම (මෙහිදී ඔබ Register වන විට කරන ක්‍රමයටම දමමු)
        // ඔබ Register වීමේදී password_hash පාවිච්චි කරන්නේ නම් පහත රේඛාව පාවිච්චි කරන්න:
        // $finalNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        
        // නැතහොත් සරලව:
        $finalNewPassword = $newPassword; 

        $updateSql = "UPDATE users SET password = ? WHERE email = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ss", $finalNewPassword, $email);
        
        if($updateStmt->execute()) {
            echo "Successful";
        } else {
            echo "Error updating password.";
        }
        $updateStmt->close();
    } else {
        echo "Incorrect current password.";
    }
} else {
    echo "User not found.";
}

$stmt->close();
$conn->close();
?>