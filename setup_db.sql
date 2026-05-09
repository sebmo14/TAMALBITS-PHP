CREATE DATABASE IF NOT EXISTS tamalbits_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tamalbits_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario BIGINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tamalbits INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    imagen_url VARCHAR(255),
    otorga_tamalbits BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS gastos (
    id_gasto INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    producto_id INT,
    monto DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    descripcion TEXT,
    tamalbits_ganados INT DEFAULT 0,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (producto_id) REFERENCES productos(id_producto)
);

INSERT IGNORE INTO usuarios (id_usuario, nombre, tamalbits) VALUES (240420241040, 'Usuario Prueba', 0);

INSERT IGNORE INTO productos (id_producto, nombre, descripcion, precio, categoria, otorga_tamalbits) VALUES
(1, 'Orejas de pollo', 'Deliciosas orejas de pollo fritas', 50.00, 'Alimentos', TRUE),
(2, 'Cafe Americano', 'Cafe americano recien hecho', 30.00, 'Bebidas', FALSE),
(3, 'Torta de jamon', 'Torta tradicional de jamon', 45.00, 'Alimentos', FALSE),
(4, 'Refresco de cola', 'Bebida carbonatada fria', 20.00, 'Bebidas', FALSE);
