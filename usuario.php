<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require 'db.php';

$usuario_id = $_GET['usuario_id'] ?? 0;

$stmt = $conn->prepare('SELECT * FROM usuarios WHERE id_usuario = ?');
$stmt->bind_param('i', $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();

if ($usuario) {
    echo json_encode($usuario);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$conn->close();
?>