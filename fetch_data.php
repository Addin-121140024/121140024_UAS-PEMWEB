<?php
header('Content-Type: application/json');

// Koneksi ke database
$koneksi = new mysqli('localhost', 'username', 'password', 'nama_database');

// Periksa koneksi
if ($koneksi->connect_error) {
    die('Koneksi gagal: ' . $koneksi->connect_error);
}

// Query untuk mengambil data dari tabel activities
$query = "SELECT * FROM activities";
$hasil = $koneksi->query($query);

// Siapkan array untuk menyimpan data
$data = [];

if ($hasil->num_rows > 0) {
    while($baris = $hasil->fetch_assoc()) {
        $data[] = $baris;
    }
}

// Keluarkan data sebagai JSON
echo json_encode($data);

// Tutup koneksi
$koneksi->close();
?>
