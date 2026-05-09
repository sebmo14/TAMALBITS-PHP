const USUARIO_ID = 240420241040;
const BASE_URL = 'http://localhost/TAMALBITS-main';

async function obtenerProductos() {
    const res = await fetch(`${BASE_URL}/productos.php`);
    return await res.json();
}

async function obtenerUsuario() {
    const res = await fetch(`${BASE_URL}/usuario.php?usuario_id=${USUARIO_ID}`);
    return await res.json();
}

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

async function obtenerHistorial() {
    const res = await fetch(`${BASE_URL}/gastos.php?accion=historial&usuario_id=${USUARIO_ID}`);
    return await res.json();
}