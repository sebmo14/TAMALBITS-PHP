<?php
/**
 * API Endpoint: Información de Usuario
 * Obtiene los detalles de un usuario específico, incluyendo su saldo de "Tamalbits".
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

// Obtiene el ID del usuario desde los parámetros de la URL (GET)
$usuario_id = $_GET['usuario_id'] ?? 0;

// Preparación de sentencia para prevenir inyección SQL
$stmt = $conn->prepare('SELECT * FROM usuarios WHERE id_usuario = ?');
$stmt->bind_param('i', $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();

// Retorna el objeto usuario o un error 404 si no existe
if ($usuario) {
    echo json_encode($usuario);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$conn->close();
?>