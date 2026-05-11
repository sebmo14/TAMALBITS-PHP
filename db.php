<?php
/**
 * Persistence Layer: Database Connection
 * Este archivo establece la conexión principal con la base de datos MySQL utilizando la extensión mysqli.
 * Proporciona un objeto de conexión ($conn) que será reutilizado por los demás servicios del backend.
 */

// Desactiva el reporte de errores interno de mysqli para manejarlos de forma personalizada
error_reporting(0);
mysqli_report(MYSQLI_REPORT_OFF);

// Configuración de credenciales de acceso a la base de datos
$host = 'localhost';
$db = 'tamalbits_db';
$user = 'root';
$password = '';

// Inicialización de la conexión
$conn = new mysqli($host, $user, $password, $db);

// Verificación de errores en el proceso de conexión
if ($conn->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Configuración del conjunto de caracteres para soportar tildes y caracteres especiales
$conn->set_charset('utf8mb4');
?>