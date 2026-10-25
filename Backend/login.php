<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Database eken email eka thiyenawada kiyala gannawa
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        // Password eka match wenawada balanawa
        if (password_verify($password, $user['password'])) {
            echo "Login Successful! Welcome " . $user['name'];
            // Methanadi session ekak start karala home page ekata redirect karanna puluwan.
            // session_start(); $_SESSION['user_id'] = $user['id']; header('Location: index.html');
        } else {
            echo "Password eka waradiy.";
        }
    } else {
        echo "Me email eken account ekak na.";
    }
}
?>