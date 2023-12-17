<?php
session_start(); // Mulai sesi untuk menyimpan informasi login

// Periksa apakah data form telah dikirim
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sertakan file koneksi database di sini
    include 'database_connection.php';

    // Dapatkan email dan password dari form dan bersihkan dari karakter khusus
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Hash password menggunakan password_hash() saat mendaftar user dan password_verify() saat login
    $sql = "SELECT id, email, password FROM users WHERE email = ?";
    
    // Siapkan prepared statement untuk keamanan yang lebih baik
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        
        // Verifikasi jika user ditemukan di database
        if ($stmt->num_rows == 1) {
            $stmt->bind_result($id, $email, $hashed_password);
            $stmt->fetch();

            // Jika password cocok (gunakan password_verify)
            if (password_verify($password, $hashed_password)) {
                // Simpan data di sesi dan alihkan ke halaman lain
                $_SESSION['loggedin'] = true;
                $_SESSION['id'] = $id;
                $_SESSION['email'] = $email;
                header('Location: transisi.html'); // Ganti dengan halaman tujuan setelah login
                exit;
            } else {
                echo 'Invalid password.';
            }
        } else {
            echo 'Invalid email.';
        }
        $stmt->close();
    }
    $conn->close();
}
?>
