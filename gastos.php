<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
require 'db.php';

$accion = $_GET['accion'] ?? '';

if ($accion === 'guardar') {
    $body = json_decode(file_get_contents('php://input'), true);

    $usuario_id = $body['usuario_id'];
    $producto_id = $body['producto_id'];
    $monto = $body['monto'];
    $categoria = $body['categoria'] ?? '';
    $descripcion = $body['descripcion'] ?? '';
    $tamalbits_ganados = $body['tamalbits_ganados'] ?? 0;

    $stmt = $conn->prepare('INSERT INTO gastos (usuario_id, producto_id, monto, categoria, descripcion, tamalbits_ganados) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->bind_param('iidssi', $usuario_id, $producto_id, $monto, $categoria, $descripcion, $tamalbits_ganados);

    if ($stmt->execute()) {
        // Actualizar tamalbits del usuario si ganó
        if ($tamalbits_ganados > 0) {
            $upd = $conn->prepare('UPDATE usuarios SET tamalbits = tamalbits + ? WHERE id_usuario = ?');
            $upd->bind_param('ii', $tamalbits_ganados, $usuario_id);
            $upd->execute();
        }
        echo json_encode(['ok' => true, 'id_gasto' => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }

} elseif ($accion === 'historial') {
    $usuario_id = $_GET['usuario_id'] ?? 0;

    $stmt = $conn->prepare('
        SELECT g.*, p.nombre AS producto_nombre, p.imagen_url
        FROM gastos g
        JOIN productos p ON g.producto_id = p.id_producto
        WHERE g.usuario_id = ?
        ORDER BY g.fecha DESC
    ');
    $stmt->bind_param('i', $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $historial = [];
    while ($row = $result->fetch_assoc()) {
        $historial[] = $row;
    }

    echo json_encode($historial);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Acción no válida']);
}

$conn->close();
?>