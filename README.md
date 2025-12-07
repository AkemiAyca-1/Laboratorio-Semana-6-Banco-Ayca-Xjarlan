# Laboratorio-Semana-6-Banco-Ayca-Xjarlan
# Rutas para probar los ejercicios
http://localhost:3000/banco/cliente/1/operaciones

http://localhost:3000/banco/cajero/2001

http://localhost:3000/banco/cuenta/1001

http://localhost:3000/banco/extracto/1001/100/600

http://localhost:3000/banco/extracto/retiros/1001

http://localhost:3000/banco/extracto/exitosas/1001

http://localhost:3000/banco/usuario/juanp

http://localhost:3000/banco/tarjeta/2001

ejecutar con: (En mi caso lo hize con git bash)
npm install
node index.js

Tener en cuenta en la BD:
create database 006_banco_laboratorioSemana6;
use 006_banco_laboratorioSemana6;

CREATE TABLE CLIENTES (
    id_cliente INT PRIMARY KEY,
    nombre VARCHAR(50),
    ap_pat VARCHAR(50),
    ap_mat VARCHAR(50),
    sexo ENUM('M', 'F'),
    fecha_nac DATE,
    pais_res VARCHAR(50),
    estado_civil VARCHAR(30),
    ciudad_res VARCHAR(50),
    telefono VARCHAR(20),
    correo VARCHAR(100)
);

CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY,
    nombre_user VARCHAR(50),
    pase VARCHAR(100),
    estado_notif ENUM('activo', 'inactivo'),
    id_cliente INT UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

CREATE TABLE CUENTAS (
    num_cuenta INT PRIMARY KEY,
    balance DECIMAL(12,2),
    fecha_ap DATE,
    estado ENUM('activa', 'inactiva'),
    tipo ENUM('cuenta corriente', 'caja de ahorro'),
    moneda ENUM('euro', 'dólar'),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

CREATE TABLE HISTORIAL_CUENTA (
    id_historial INT PRIMARY KEY,
    tipo ENUM('deposito', 'retiro'),
    monto DECIMAL(12,2),
    medio_transf ENUM('banco', 'online', 'cajero automático'),
    estado_op ENUM('pendiente', 'fallida', 'exitosa'),
    concepto VARCHAR(255),
    num_cuenta INT,
    FOREIGN KEY (num_cuenta) REFERENCES CUENTAS(num_cuenta)
);

CREATE TABLE TARJETAS (
    num_tarjeta INT PRIMARY KEY,
    fecha_venc DATE,
    cod_seg VARCHAR(10),
    pase VARCHAR(100),
    limite_retiro DECIMAL(12,2),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

CREATE TABLE CUENTA_TARJETA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_cuenta INT,
    num_tarjeta INT,
    FOREIGN KEY (num_cuenta) REFERENCES CUENTAS(num_cuenta),
    FOREIGN KEY (num_tarjeta) REFERENCES TARJETAS(num_tarjeta),
    UNIQUE (num_cuenta, num_tarjeta)
);

-- Insercion de datos en las tablas
-- CLIENTES
INSERT INTO CLIENTES VALUES
(1,'Juan','Perez','Lopez','M','1985-03-12','Bolivia','Casado','La Paz','789456123','juan.perez@mail.com'),
(2,'Maria','Gomez','Diaz','F','1990-07-25','Bolivia','Soltera','Cochabamba','654987321','maria.gomez@mail.com'),
(3,'Carlos','Fernandez','Rojas','M','1978-11-02','Bolivia','Casado','Santa Cruz','741852963','carlos.fernandez@mail.com'),
(4,'Ana','Torres','Mendoza','F','1995-01-15','Bolivia','Soltera','La Paz','963852741','ana.torres@mail.com'),
(5,'Luis','Martinez','Suarez','M','1982-09-09','Bolivia','Casado','Oruro','852963741','luis.martinez@mail.com'),
(6,'Sofia','Vargas','Gutierrez','F','1988-05-20','Bolivia','Casada','Tarija','951753456','sofia.vargas@mail.com'),
(7,'Diego','Ramirez','Flores','M','1993-12-30','Bolivia','Soltero','Potosi','753159456','diego.ramirez@mail.com'),
(8,'Valeria','Castro','Aguilar','F','1987-04-18','Bolivia','Casada','Chuquisaca','357951456','valeria.castro@mail.com'),
(9,'Jorge','Lopez','Quispe','M','1975-06-10','Bolivia','Casado','Beni','159753456','jorge.lopez@mail.com'),
(10,'Camila','Rios','Ortiz','F','1992-08-22','Bolivia','Soltera','Pando','456753159','camila.rios@mail.com');

-- USUARIO
INSERT INTO USUARIO VALUES
(1,'juanp','pass123','activo',1),
(2,'mariag','clave456','inactivo',2),
(3,'carlosf','seguro789','activo',3),
(4,'anat','1234ana','activo',4),
(5,'luism','passlu','inactivo',5),
(6,'sofiav','claveSV','activo',6),
(7,'diegor','drpass','activo',7),
(8,'valeriac','vcpass','inactivo',8),
(9,'jorgel','jlpass','activo',9),
(10,'camilar','crpass','activo',10);

-- CUENTAS
INSERT INTO CUENTAS VALUES
(1001,2500.50,'2020-01-10','activa','cuenta corriente','dólar',1),
(1002,1500.00,'2021-03-15','activa','caja de ahorro','euro',1),
(1003,5000.75,'2019-07-20','activa','cuenta corriente','dólar',2),
(1004,300.00,'2022-05-05','inactiva','caja de ahorro','euro',3),
(1005,12000.00,'2018-09-09','activa','cuenta corriente','dólar',4),
(1006,750.25,'2021-11-11','activa','caja de ahorro','euro',5),
(1007,9800.00,'2020-06-06','activa','cuenta corriente','dólar',6),
(1008,450.00,'2022-02-02','inactiva','caja de ahorro','euro',7),
(1009,2200.00,'2019-12-12','activa','cuenta corriente','dólar',8),
(1010,600.00,'2023-01-01','activa','caja de ahorro','euro',9);

-- HISTORIAL_CUENTA
INSERT INTO HISTORIAL_CUENTA VALUES
(1,'deposito',500.00,'banco','exitosa','Pago sueldo',1001),
(2,'retiro',200.00,'cajero automático','exitosa','Retiro efectivo',1001),
(3,'deposito',1000.00,'online','pendiente','Transferencia externa',1002),
(4,'retiro',50.00,'cajero automático','fallida','Error cajero',1003),
(5,'deposito',3000.00,'banco','exitosa','Venta auto',1004),
(6,'retiro',100.00,'online','exitosa','Pago servicios',1005),
(7,'deposito',200.00,'banco','exitosa','Depósito ahorro',1006),
(8,'retiro',150.00,'cajero automático','exitosa','Retiro fin de semana',1007),
(9,'deposito',500.00,'online','exitosa','Transferencia familiar',1008),
(10,'retiro',250.00,'banco','exitosa','Pago alquiler',1009);

-- TARJETAS
INSERT INTO TARJETAS VALUES
(2001,'2026-12-31','123','pass2001',1000.00,1),
(2002,'2027-05-30','456','pass2002',1500.00,2),
(2003,'2025-08-15','789','pass2003',2000.00,3),
(2004,'2026-01-01','321','pass2004',500.00,4),
(2005,'2027-09-09','654','pass2005',1200.00,5),
(2006,'2025-11-11','987','pass2006',800.00,6),
(2007,'2026-07-07','741','pass2007',2500.00,7),
(2008,'2027-02-02','852','pass2008',600.00,8),
(2009,'2025-06-06','963','pass2009',1800.00,9),
(2010,'2026-03-03','159','pass2010',900.00,10);

-- CUENTA_TARJETA (relación N:M)
INSERT INTO CUENTA_TARJETA (num_cuenta,num_tarjeta) VALUES
(1001,2001),
(1002,2001),
(1003,2002),
(1004,2003),
(1005,2004),
(1006,2005),
(1007,2006),
(1008,2007),
(1009,2008),
(1010,2009);



-- Para las pantallas:
-- Pantalla principal app móvil
-- Últimas 5 operaciones del cliente con número de cuenta, moneda y balance
SELECT hc.num_cuenta, c.moneda, c.balance, hc.monto, hc.tipo, hc.estado_op, hc.concepto
FROM HISTORIAL_CUENTA hc
JOIN CUENTAS c ON hc.num_cuenta = c.num_cuenta
JOIN CLIENTES cl ON c.id_cliente = cl.id_cliente
WHERE cl.id_cliente = 1
ORDER BY hc.id_historial DESC
LIMIT 5;

-- Pantalla principal cajero automático
-- Info del cliente, número de tarjeta, número de cuenta y moneda
SELECT cl.nombre, cl.ap_pat, cl.ap_mat, t.num_tarjeta, c.num_cuenta, c.moneda
FROM TARJETAS t
JOIN CLIENTES cl ON t.id_cliente = cl.id_cliente
JOIN CUENTA_TARJETA ct ON t.num_tarjeta = ct.num_tarjeta
JOIN CUENTAS c ON ct.num_cuenta = c.num_cuenta
WHERE t.num_tarjeta = 2001;

-- Pantalla de la cuenta - app móvil
-- Info de cuenta y últimas operaciones
SELECT c.num_cuenta, c.moneda, c.tipo, c.balance, hc.monto, hc.estado_op, hc.tipo
FROM CUENTAS c
JOIN HISTORIAL_CUENTA hc ON c.num_cuenta = hc.num_cuenta
WHERE c.num_cuenta = 1001
ORDER BY hc.id_historial DESC;

-- Pantalla de extracto de cuenta - rango de montos
SELECT hc.tipo, hc.medio_transf, hc.concepto, hc.estado_op, hc.monto
FROM HISTORIAL_CUENTA hc
WHERE hc.num_cuenta = 1001 AND hc.monto BETWEEN 100 AND 600;

-- Pantalla de extracto de cuenta - solo retiros
SELECT hc.medio_transf, hc.concepto, hc.estado_op, hc.monto
FROM HISTORIAL_CUENTA hc
WHERE hc.num_cuenta = 1001 AND hc.tipo = 'retiro';

-- Pantalla de extracto de cuenta - operaciones exitosas > 100
SELECT hc.medio_transf, hc.concepto, hc.estado_op, hc.monto, hc.num_cuenta
FROM HISTORIAL_CUENTA hc
WHERE hc.num_cuenta = 1001 AND hc.estado_op = 'exitosa' AND hc.monto > 100;

-- Pantalla de usuario - app móvil
SELECT u.nombre_user, u.estado_notif, cl.telefono, cl.correo, cl.nombre, cl.ap_pat, cl.ap_mat, cl.id_cliente
FROM USUARIO u
JOIN CLIENTES cl ON u.id_cliente = cl.id_cliente
WHERE u.nombre_user = 'juanp';

-- Pantalla de info de la tarjeta
SELECT t.num_tarjeta, t.fecha_venc, t.limite_retiro, c.num_cuenta, c.moneda
FROM TARJETAS t
JOIN CUENTA_TARJETA ct ON t.num_tarjeta = ct.num_tarjeta
JOIN CUENTAS c ON ct.num_cuenta = c.num_cuenta
WHERE t.num_tarjeta = 2001;


create database 006_banco_laboratorioSemana6;
use 006_banco_laboratorioSemana6;

CREATE TABLE CLIENTES (
    id_cliente INT PRIMARY KEY,
    nombre VARCHAR(50),
    ap_pat VARCHAR(50),
    ap_mat VARCHAR(50),
    sexo ENUM('M', 'F'),
    fecha_nac DATE,
    pais_res VARCHAR(50),
    estado_civil VARCHAR(30),
    ciudad_res VARCHAR(50),
    telefono VARCHAR(20),
    correo VARCHAR(100)
);

CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY,
    nombre_user VARCHAR(50),
    pase VARCHAR(100),
    estado_notif ENUM('activo', 'inactivo'),
    id_cliente INT UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

CREATE TABLE CUENTAS (
    num_cuenta INT PRIMARY KEY,
    balance DECIMAL(12,2),
    fecha_ap DATE,
    estado ENUM('activa', 'inactiva'),
    tipo ENUM('cuenta corriente', 'caja de ahorro'),
    moneda ENUM('euro', 'dólar'),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

CREATE TABLE HISTORIAL_CUENTA (
    id_historial INT PRIMARY KEY,
    tipo ENUM('deposito', 'retiro'),
    monto DECIMAL(12,2),
    medio_transf ENUM('banco', 'online', 'cajero automático'),
    estado_op ENUM('pendiente', 'fallida', 'exitosa'),
    concepto VARCHAR(255),
    num_cuenta INT,
    FOREIGN KEY (num_cuenta) REFERENCES CUENTAS(num_cuenta)
);

CREATE TABLE TARJETAS (
    num_tarjeta INT PRIMARY KEY,
    fecha_venc DATE,
    cod_seg VARCHAR(10),
    pase VARCHAR(100),
    limite_retiro DECIMAL(12,2),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

CREATE TABLE CUENTA_TARJETA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_cuenta INT,
    num_tarjeta INT,
    FOREIGN KEY (num_cuenta) REFERENCES CUENTAS(num_cuenta),
    FOREIGN KEY (num_tarjeta) REFERENCES TARJETAS(num_tarjeta),
    UNIQUE (num_cuenta, num_tarjeta)
);

-- Insercion de datos en las tablas
-- CLIENTES
INSERT INTO CLIENTES VALUES
(1,'Juan','Perez','Lopez','M','1985-03-12','Bolivia','Casado','La Paz','789456123','juan.perez@mail.com'),
(2,'Maria','Gomez','Diaz','F','1990-07-25','Bolivia','Soltera','Cochabamba','654987321','maria.gomez@mail.com'),
(3,'Carlos','Fernandez','Rojas','M','1978-11-02','Bolivia','Casado','Santa Cruz','741852963','carlos.fernandez@mail.com'),
(4,'Ana','Torres','Mendoza','F','1995-01-15','Bolivia','Soltera','La Paz','963852741','ana.torres@mail.com'),
(5,'Luis','Martinez','Suarez','M','1982-09-09','Bolivia','Casado','Oruro','852963741','luis.martinez@mail.com'),
(6,'Sofia','Vargas','Gutierrez','F','1988-05-20','Bolivia','Casada','Tarija','951753456','sofia.vargas@mail.com'),
(7,'Diego','Ramirez','Flores','M','1993-12-30','Bolivia','Soltero','Potosi','753159456','diego.ramirez@mail.com'),
(8,'Valeria','Castro','Aguilar','F','1987-04-18','Bolivia','Casada','Chuquisaca','357951456','valeria.castro@mail.com'),
(9,'Jorge','Lopez','Quispe','M','1975-06-10','Bolivia','Casado','Beni','159753456','jorge.lopez@mail.com'),
(10,'Camila','Rios','Ortiz','F','1992-08-22','Bolivia','Soltera','Pando','456753159','camila.rios@mail.com');

-- USUARIO
INSERT INTO USUARIO VALUES
(1,'juanp','pass123','activo',1),
(2,'mariag','clave456','inactivo',2),
(3,'carlosf','seguro789','activo',3),
(4,'anat','1234ana','activo',4),
(5,'luism','passlu','inactivo',5),
(6,'sofiav','claveSV','activo',6),
(7,'diegor','drpass','activo',7),
(8,'valeriac','vcpass','inactivo',8),
(9,'jorgel','jlpass','activo',9),
(10,'camilar','crpass','activo',10);

-- CUENTAS
INSERT INTO CUENTAS VALUES
(1001,2500.50,'2020-01-10','activa','cuenta corriente','dólar',1),
(1002,1500.00,'2021-03-15','activa','caja de ahorro','euro',1),
(1003,5000.75,'2019-07-20','activa','cuenta corriente','dólar',2),
(1004,300.00,'2022-05-05','inactiva','caja de ahorro','euro',3),
(1005,12000.00,'2018-09-09','activa','cuenta corriente','dólar',4),
(1006,750.25,'2021-11-11','activa','caja de ahorro','euro',5),
(1007,9800.00,'2020-06-06','activa','cuenta corriente','dólar',6),
(1008,450.00,'2022-02-02','inactiva','caja de ahorro','euro',7),
(1009,2200.00,'2019-12-12','activa','cuenta corriente','dólar',8),
(1010,600.00,'2023-01-01','activa','caja de ahorro','euro',9);

-- HISTORIAL_CUENTA
INSERT INTO HISTORIAL_CUENTA VALUES
(1,'deposito',500.00,'banco','exitosa','Pago sueldo',1001),
(2,'retiro',200.00,'cajero automático','exitosa','Retiro efectivo',1001),
(3,'deposito',1000.00,'online','pendiente','Transferencia externa',1002),
(4,'retiro',50.00,'cajero automático','fallida','Error cajero',1003),
(5,'deposito',3000.00,'banco','exitosa','Venta auto',1004),
(6,'retiro',100.00,'online','exitosa','Pago servicios',1005),
(7,'deposito',200.00,'banco','exitosa','Depósito ahorro',1006),
(8,'retiro',150.00,'cajero automático','exitosa','Retiro fin de semana',1007),
(9,'deposito',500.00,'online','exitosa','Transferencia familiar',1008),
(10,'retiro',250.00,'banco','exitosa','Pago alquiler',1009);

-- TARJETAS
INSERT INTO TARJETAS VALUES
(2001,'2026-12-31','123','pass2001',1000.00,1),
(2002,'2027-05-30','456','pass2002',1500.00,2),
(2003,'2025-08-15','789','pass2003',2000.00,3),
(2004,'2026-01-01','321','pass2004',500.00,4),
(2005,'2027-09-09','654','pass2005',1200.00,5),
(2006,'2025-11-11','987','pass2006',800.00,6),
(2007,'2026-07-07','741','pass2007',2500.00,7),
(2008,'2027-02-02','852','pass2008',600.00,8),
(2009,'2025-06-06','963','pass2009',1800.00,9),
(2010,'2026-03-03','159','pass2010',900.00,10);

-- CUENTA_TARJETA (relación N:M)
INSERT INTO CUENTA_TARJETA (num_cuenta,num_tarjeta) VALUES
(1001,2001),
(1002,2001),
(1003,2002),
(1004,2003),
(1005,2004),
(1006,2005),
(1007,2006),
(1008,2007),
(1009,2008),
(1010,2009);



-- Para las pantallas:
-- Pantalla principal app móvil
-- Últimas 5 operaciones del cliente con número de cuenta, moneda y balance
SELECT hc.num_cuenta, c.moneda, c.balance, hc.monto, hc.tipo, hc.estado_op, hc.concepto
FROM HISTORIAL_CUENTA hc
JOIN CUENTAS c ON hc.num_cuenta = c.num_cuenta
JOIN CLIENTES cl ON c.id_cliente = cl.id_cliente
WHERE cl.id_cliente = 1
ORDER BY hc.id_historial DESC
LIMIT 5;

-- Pantalla principal cajero automático
-- Info del cliente, número de tarjeta, número de cuenta y moneda
SELECT cl.nombre, cl.ap_pat, cl.ap_mat, t.num_tarjeta, c.num_cuenta, c.moneda
FROM TARJETAS t
JOIN CLIENTES cl ON t.id_cliente = cl.id_cliente
JOIN CUENTA_TARJETA ct ON t.num_tarjeta = ct.num_tarjeta
JOIN CUENTAS c ON ct.num_cuenta = c.num_cuenta
WHERE t.num_tarjeta = 2001;

-- Pantalla de la cuenta - app móvil
-- Info de cuenta y últimas operaciones
SELECT c.num_cuenta, c.moneda, c.tipo, c.balance, hc.monto, hc.estado_op, hc.tipo
FROM CUENTAS c
JOIN HISTORIAL_CUENTA hc ON c.num_cuenta = hc.num_cuenta
WHERE c.num_cuenta = 1001
ORDER BY hc.id_historial DESC;

-- Pantalla de extracto de cuenta - rango de montos
SELECT hc.tipo, hc.medio_transf, hc.concepto, hc.estado_op, hc.monto
FROM HISTORIAL_CUENTA hc
WHERE hc.num_cuenta = 1001 AND hc.monto BETWEEN 100 AND 600;

-- Pantalla de extracto de cuenta - solo retiros
SELECT hc.medio_transf, hc.concepto, hc.estado_op, hc.monto
FROM HISTORIAL_CUENTA hc
WHERE hc.num_cuenta = 1001 AND hc.tipo = 'retiro';

-- Pantalla de extracto de cuenta - operaciones exitosas > 100
SELECT hc.medio_transf, hc.concepto, hc.estado_op, hc.monto, hc.num_cuenta
FROM HISTORIAL_CUENTA hc
WHERE hc.num_cuenta = 1001 AND hc.estado_op = 'exitosa' AND hc.monto > 100;

-- Pantalla de usuario - app móvil
SELECT u.nombre_user, u.estado_notif, cl.telefono, cl.correo, cl.nombre, cl.ap_pat, cl.ap_mat, cl.id_cliente
FROM USUARIO u
JOIN CLIENTES cl ON u.id_cliente = cl.id_cliente
WHERE u.nombre_user = 'juanp';

-- Pantalla de info de la tarjeta
SELECT t.num_tarjeta, t.fecha_venc, t.limite_retiro, c.num_cuenta, c.moneda
FROM TARJETAS t
JOIN CUENTA_TARJETA ct ON t.num_tarjeta = ct.num_tarjeta
JOIN CUENTAS c ON ct.num_cuenta = c.num_cuenta
WHERE t.num_tarjeta = 2001;
