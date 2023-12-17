<?php
require 'database_connection.php'; // Pastikan file ini mengandung koneksi ke database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $confirm_password = mysqli_real_escape_string($conn, $_POST['confirm_password']);

    // Periksa apakah password dan konfirmasi password cocok
    if ($password === $confirm_password) {
        // Hash password menggunakan PASSWORD_DEFAULT
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Masukkan pengguna baru ke database
        $insertQuery = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $insertQuery->bind_param("ss", $email, $hashed_password);

        // Eksekusi query dan periksa apakah berhasil
        if ($insertQuery->execute()) {
            echo "User registered successfully.";
            // Redirect ke halaman login atau suatu halaman
            header("Location: login.html");
            exit;
        } else {
            echo "Error: " . $conn->error;
        }
        $insertQuery->close();
    } else {
        echo "Passwords do not match.";
    }
    $conn->close();
}
?>
