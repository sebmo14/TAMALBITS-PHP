<?php
/**
 * Integración: API Proxy (Patrón Intermediario)
 * Este archivo actúa como un túnel entre el frontend y una API externa (Bancos en el puerto 8083).
 * Motivos de uso:
 * 1. Resolver problemas de CORS (Cross-Origin Resource Sharing).
 * 2. Centralizar peticiones externas en un solo punto del servidor.
 * 3. Ocultar la arquitectura interna del sistema externo.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Captura el método y la ruta destino (ej: api/account/...)
$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['path'] ?? '';
$url = "http://localhost:8083/" . $path; // URL de la API externa

// Inicializa cURL para realizar la petición HTTP interna
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

// Si es un POST, transfiere el cuerpo de la petición (JSON) a la API destino
if ($method === 'POST') {
    $body = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
}

// Ejecuta la petición y captura la respuesta
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Replica el código de estado y la respuesta de la API externa
http_response_code($httpCode);
echo $response;
?>