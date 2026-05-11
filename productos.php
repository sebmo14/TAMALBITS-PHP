<?php
/**
 * API Endpoint: Catálogo de Productos
 * Retorna la lista completa de productos disponibles en la tienda.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite peticiones desde el frontend (CORS)

require 'db.php'; // Incluye la instancia de conexión $conn

// Ejecuta la consulta para obtener todos los productos
$result = $conn->query('SELECT * FROM productos');
$productos = [];

while ($row = $result->fetch_assoc()) {
    // Normaliza el tipo de dato para el flag de Tamalbits
    $row['otorga_tamalbits'] = (bool)$row['otorga_tamalbits'];
    $productos[] = $row;
}

// Devuelve los datos en formato JSON para que sean consumidos por el frontend
echo json_encode($productos);

$conn->close();
?>