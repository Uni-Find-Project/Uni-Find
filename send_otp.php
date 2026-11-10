<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    
    $checkUser = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $checkUser);
    
    if (mysqli_num_rows($result) > 0) {
        $otp = rand(100000, 999999); 
        
        
        mysqli_query($conn, "UPDATE users SET reset_code='$otp' WHERE email='$email'");
        
        $subject = "UniFind Password Reset Code";
        $message = "Your password reset code is: " . $otp;
        $headers = "From: noreply@unifind.com";
        
        
        if(@mail($email, $subject, $message, $headers)) {
            echo "OTP has been sent to your email.";
        } else {
          
            echo "Localhost Mode: Your OTP is [ $otp ]"; 
        }
    } else {
        echo "Email not found in our system.";
    }
}
?>