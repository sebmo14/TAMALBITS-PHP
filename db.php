<?php
error_reporting(0);
mysqli_report(MYSQLI_REPORT_OFF);

$host = 'localhost';
$db = 'tamalbits_db';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

$conn->set_charset('utf8mb4');
?>