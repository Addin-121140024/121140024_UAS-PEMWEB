<?php
// Establish connection parameters
include "database_connection.php";

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO activities (tanggal, kegiatan, keterangan, unit, total) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssid", $tanggal, $kegiatan, $keterangan, $unit, $total);

// Set parameters and execute
$tanggal = $_POST['tanggal'];
$kegiatan = $_POST['kegiatan'];
$keterangan = $_POST['keterangan'];
$unit = (int)$_POST['unit'];
$total = (float)$_POST['total'];

if ($stmt->execute()) {
  echo "New records created successfully";
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
