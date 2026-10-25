<?php
$host = "localhost";
$user = "root"; // XAMPP eke default username eka root
$password = ""; // XAMPP eke default password ekak na (his)
$database = "unifind_db"; // Api kalin hadapu database eke nama

// Database ekata connect weema
$conn = mysqli_connect($host, $user, $password, $database);

// Connection eka hariyata wadada kiyala balima
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>