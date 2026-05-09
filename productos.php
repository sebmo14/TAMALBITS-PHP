<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require 'db.php';

$result = $conn->query('SELECT * FROM productos');
$productos = [];
while ($row = $result->fetch_assoc()) {
    $row['otorga_tamalbits'] = (bool)$row['otorga_tamalbits'];
    $productos[] = $row;
}

echo json_encode($productos);
$conn->close();
?>