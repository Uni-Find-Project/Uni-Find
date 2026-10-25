<?php
require 'db.php'; // Database connection eka mekata gannawa

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Password eka secure karanna hash karanawa
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Email eka kalin database eke thiyenawada balanawa
    $check_email = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $check_email);

    if (mysqli_num_rows($result) > 0) {
        echo "Me email eken kalin account ekak hadala thiyenne.";
    } else {
        // Aluth user wa database ekata insert karanawa
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashed_password')";
        
        if (mysqli_query($conn, $sql)) {
            echo "Registration Successful! Dan login wenna puluwan.";
            // Puluwannam header('Location: login.html'); kiyala login page ekata yawanna puluwan.
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    }
}
?>