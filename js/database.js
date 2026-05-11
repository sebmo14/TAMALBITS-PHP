/**
 * Data Access Layer: Abstracción de API Local
 * Este archivo centraliza todas las peticiones fetch hacia los endpoints PHP.
 * Sigue el patrón de Repository para separar la lógica de obtención de datos de la lógica de UI.
 */

const USUARIO_ID = 240420241040; // Identificador único del usuario (Simulado)
const BASE_URL = 'http://localhost/TAMALBITS-main'; // URL base del backend local

/**
 * Obtiene la lista de productos desde productos.php
 */
async function obtenerProductos() {
    const res = await fetch(`${BASE_URL}/productos.php`);
    return await res.json();
}

/**
 * Obtiene el perfil del usuario desde usuario.php
 */
async function obtenerUsuario() {
    const res = await fetch(`${BASE_URL}/usuario.php?usuario_id=${USUARIO_ID}`);
    return await res.json();
}

/**
 * Registra un nuevo gasto enviando un objeto JSON mediante POST a gastos.php
 */
async function guardarGasto(productoId, monto, categoria, descripcion, tamalbitsGanados) {
    const res = await fetch(`${BASE_URL}/gastos.php?accion=guardar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuario_id: USUARIO_ID,
            producto_id: productoId,
            monto: monto,
            categoria: categoria,
            descripcion: descripcion,
            tamalbits_ganados: tamalbitsGanados
        })
    });
    return await res.json();
}

/**
 * Recupera el historial de transacciones del usuario
 */
async function obtenerHistorial() {
    const res = await fetch(`${BASE_URL}/gastos.php?accion=historial&usuario_id=${USUARIO_ID}`);
    return await res.json();
}