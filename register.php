
<?php
require 'db.php'; // Include the database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the name, email, and password entered by the user
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Hash the password to protect it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check whether the email already exists in the database
    $check_email = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $check_email);

    if (mysqli_num_rows($result) > 0) {

        echo "An account with this email address already exists.";

    } else {

        // Insert the new user into the database
        $sql = "INSERT INTO users (name, email, password)
                VALUES ('$name', '$email', '$hashed_password')";

        if (mysqli_query($conn, $sql)) {

            echo "Registration Successful! You can now log in.";

            // Redirect the user to the login page if needed
            // header('Location: login.html');
            // exit();

        } else {

            echo "Error: " . mysqli_error($conn);

        }
    }
}
?>
