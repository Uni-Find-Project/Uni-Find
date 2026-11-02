
<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the email and password entered by the user
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Check whether the email exists in the database
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        // Fetch the user's details from the database
        $user = mysqli_fetch_assoc($result);

        // Verify whether the entered password matches the stored password
        if (password_verify($password, $user['password'])) {

            echo "Login Successful! Welcome " . $user['name'];

            // Start a session and redirect the user to the home page
            // session_start();
            // $_SESSION['user_id'] = $user['id'];
            // header('Location: index.html');
            // exit();

        } else {
            echo "Incorrect password. Please try again.";
        }

    } else {
        echo "No account found with this email address.";
    }
}
?>
