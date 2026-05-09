const API_BASE_URL = "http://localhost/TAMALBITS-main/proxy.php";
const PERSON_ID = "240420241040";

let currentBalance = 0;

const imagenesDefault = {
  "orejas de pollo": "img/pollo.jpg",
  "cafe americano": "img/cafe.jpg",
  "torta de jamon": "img/torta.jpg",
  "refresco de cola": "img/refresco.jpg"
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productGrid")) {
    renderProducts();
  }
  if (document.getElementById("historyContainer")) {
    renderHistory();
  }
  loadUserData();
});

async function loadUserData() {
  try {
    const response = await fetch(`${API_BASE_URL}?path=api/account/${PERSON_ID}`);
    if (!response.ok) throw new Error("No se pudo obtener el saldo");

    const data = await response.json();
    currentBalance =
      data.balance !== undefined
        ? data.balance
        : data.saldo !== undefined
          ? data.saldo
          : data;

    const balanceElement = document.getElementById("userBalance");
    if (balanceElement) {
      balanceElement.textContent = `$${parseFloat(currentBalance).toFixed(2)}`;
    }
    document.getElementById("balanceError")?.classList.add("d-none");
  } catch (error) {
    console.error("Error al cargar saldo:", error);
    document.getElementById("balanceError")?.classList.remove("d-none");
    const balanceElement = document.getElementById("userBalance");
    if (balanceElement) balanceElement.textContent = "Error";
  }

  try {
    const usuario = await obtenerUsuario();
    const tamalbitsElement = document.getElementById("userTamalbits");
    if (tamalbitsElement && usuario) {
      tamalbitsElement.textContent = usuario.tamalbits;
    }
  } catch (error) {
    console.error("Error al cargar tamalbits:", error);
  }
}

async function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "<p>Cargando productos...</p>";

  try {
    const products = await obtenerProductos();
    console.log("Productos:", products.map(p => p.nombre));
    grid.innerHTML = "";

    products.forEach((p) => {
      const imgSrc = imagenesDefault[p.nombre.toLowerCase()] || "https://via.placeholder.com/400";

      const tamalbitsBadge = p.otorga_tamalbits
        ? `<span class="badge bg-warning text-dark mb-2"><i class="bi bi-star-fill"></i> Otorga Tamalbits</span>`
        : "";

      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3 mb-4";
      col.innerHTML = `
        <div class="card product-card">
          <img src="${imgSrc}" class="card-img-top product-img" alt="${p.nombre}">
          <div class="card-body d-flex flex-column">
            ${tamalbitsBadge}
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text text-muted small flex-grow-1">${p.descripcion}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="price">$${parseFloat(p.precio).toFixed(2)}</span>
              <button class="btn btn-primary btn-sm" onclick="comprarProducto(${p.id_producto})">
                <i class="bi bi-cart-plus"></i> Comprar
              </button>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    grid.innerHTML = "<p class='text-danger'>Error al cargar productos.</p>";
  }
}

async function comprarProducto(id_producto) {
  let productos;
  try {
    productos = await obtenerProductos();
  } catch (e) {
    alert("Error al obtener productos.");
    return;
  }

  const producto = productos.find((p) => p.id_producto == id_producto);
  if (!producto) return;

  if (currentBalance < producto.precio) {
    alert("Saldo insuficiente en la cuenta bancaria.");
    return;
  }

  const confirmacion = confirm(
    `¿Deseas comprar ${producto.nombre} por $${parseFloat(producto.precio).toFixed(2)}?`
  );
  if (!confirmacion) return;

  try {
    const response = await fetch(
      `${API_BASE_URL}?path=api/account/${PERSON_ID}/deduct`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: producto.precio,
          reason: `Compra de ${producto.nombre}`,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      alert(`Error en la transacción bancaria: ${errorText}`);
      return;
    }

    let tamalbitsGanados = 0;
    if (producto.otorga_tamalbits) {
      tamalbitsGanados = Math.floor(producto.precio / 10);
    }

    await guardarGasto(
      producto.id_producto,
      producto.precio,
      producto.categoria,
      `Compra de ${producto.nombre}`,
      tamalbitsGanados
    );

    await loadUserData();

    showToast(
      `¡Compra exitosa! Has adquirido ${producto.nombre}.` +
        (tamalbitsGanados > 0 ? ` ¡Ganaste ${tamalbitsGanados} Tamalbits!` : "")
    );
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    alert("Error de red. Asegúrate de que la API en el puerto 8083 esté corriendo.");
  }
}

async function renderHistory() {
  const container = document.getElementById("historyContainer");
  if (!container) return;

  container.innerHTML = "<p>Cargando historial...</p>";

  try {
    const gastos = await obtenerHistorial();

    if (gastos.length === 0) {
      container.innerHTML = `<div class="alert alert-info">Aún no has realizado ninguna compra.</div>`;
      return;
    }

    container.innerHTML = "";

    gastos.forEach((g) => {
      const fecha = new Date(g.fecha).toLocaleString("es-ES");
      const imgSrc = imagenesDefault[g.producto_nombre?.toLowerCase()] || "https://via.placeholder.com/50";
      const tbBadge =
        g.tamalbits_ganados > 0
          ? `<span class="badge bg-warning text-dark"><i class="bi bi-star-fill"></i> +${g.tamalbits_ganados} TB</span>`
          : "";

      const item = document.createElement("div");
      item.className = "history-item d-flex justify-content-between align-items-center";
      item.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <div style="width: 50px; height: 50px; border-radius: 8px; overflow: hidden;">
            <img src="${imgSrc}" alt="${g.producto_nombre}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <h6 class="mb-1 fw-bold">${g.producto_nombre}</h6>
            <div class="text-muted small">${fecha}</div>
          </div>
        </div>
        <div class="text-end">
          <div class="fw-bold text-danger">-$${parseFloat(g.monto).toFixed(2)}</div>
          ${tbBadge}
        </div>
      `;
      container.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar historial:", error);
    container.innerHTML = "<p class='text-danger'>Error al cargar historial.</p>";
  }
}

function showToast(message) {
  const toastEl = document.getElementById("notificationToast");
  if (!toastEl) return;
  document.getElementById("toastMessage").textContent = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}