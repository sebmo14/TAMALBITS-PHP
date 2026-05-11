# 🏪 Tamalbits Web Store

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

**Tamalbits Web** es una plataforma de tienda virtual educativa diseñada para demostrar la integración de sistemas web, el manejo de APIs externas y la implementación de sistemas de recompensas (puntos virtuales).

---

## 📖 Documentación Oficial

Para una explicación técnica profunda, diagramas de flujo y detalles de implementación para estudiantes, visita nuestra documentación en Notion:

🔗 **[Documentación Completa en Notion](https://awake-pair-a66.notion.site/TAMALBITS-DOCUMENTACI-N-35d954a3967780ce9f5ce053089aabd7?source=copy_link)**

---

## ✨ Características Principales

- 🛍️ **Catálogo Dinámico:** Carga de productos en tiempo real desde una base de datos MySQL.
- 💳 **Integración Bancaria Simulada:** Uso de un **Proxy PHP** para transacciones seguras con una API externa.
- 🌟 **Sistema de Recompensas:** Ganancia automática de "Tamalbits" por cada compra realizada.
- 📜 **Historial de Transacciones:** Registro detallado de gastos y puntos obtenidos.
- 📱 **Diseño Responsivo:** Interfaz moderna y adaptativa construida con Bootstrap 5.

---

## 🏗️ Arquitectura Técnica

El proyecto sigue un modelo de arquitectura desacoplada:

1.  **Frontend:** Interfaz de usuario construida con HTML5 semántico y JavaScript asíncrono.
2.  **Proxy de Integración:** Un intermediario en PHP para conectar con servicios de terceros y evitar bloqueos de CORS.
3.  **Servicios Backend:** Endpoints en PHP que gestionan la lógica de negocio y la persistencia de datos local.
4.  **Base de Datos:** MySQL para el almacenamiento de productos, usuarios y registros de gastos.

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Servidor local (XAMPP, WAMP, Laragon, o similar).
- PHP 7.4 o superior.
- MySQL/MariaDB.

### Pasos
1.  **Clonar el repositorio** o copiar los archivos en tu carpeta `htdocs` o `www`.
2.  **Configurar la Base de Datos:**
    - Importa el archivo `setup_db.sql` en tu gestor de bases de datos (phpMyAdmin).
    - Asegúrate de que el nombre de la base de datos sea `tamalbits_db`.
3.  **Ajustar Conexión:**
    - Verifica las credenciales en `db.php` (host, usuario, contraseña).
4.  **Ejecutar:**
    - Accede a través de tu navegador: `http://localhost/nombre-de-tu-carpeta/index.html`.

> [!IMPORTANT]
> Para que las compras funcionen correctamente, la API bancaria externa debe estar corriendo en el puerto **8083**.

---

## 📂 Estructura del Proyecto

```text
├── css/
│   └── styles.css        # Estilos personalizados y diseño visual
├── img/                  # Recursos visuales y assets
├── js/
│   ├── app.js            # Lógica principal y orquestación
│   └── database.js       # Capa de acceso a datos (Local API)
├── db.php                # Conexión centralizada a MySQL
├── gastos.php            # Endpoint de transacciones e historial
├── productos.php         # Endpoint del catálogo de productos
├── proxy.php             # Intermediario para APIs externas
├── usuario.php           # Datos del perfil y puntos Tamalbits
├── index.html            # Vista principal de la tienda
└── historial.html        # Vista de registros históricos
```

---

## 🛠️ Tecnologías

- **Lenguajes:** PHP, JavaScript, SQL, HTML5, CSS3.
- **Frameworks/Librerías:** Bootstrap 5, Google Fonts, Bootstrap Icons.
- **Protocolos:** HTTP/REST, JSON.

---
*Desarrollado como recurso educativo para la carrera de Ingeniería de Software.*
