// Controlador para manejar las operaciones del banco

// Para el DB.
const db = require('../models/db');

// 1. Pantalla principal app movil: devolver las ultimas 5 operaciones
//  realizadas por el cliente detallando el numero de cuenta,
//  moneda y balance de la misma, asociados a la operación.

// Pantalla principal app móvil
exports.getUltimasOperaciones = (req, res) => {
  const clienteId = req.params.id;
  const sql = `
    SELECT hc.num_cuenta, c.moneda, c.balance, hc.monto, hc.tipo, hc.estado_op, hc.concepto
    FROM HISTORIAL_CUENTA hc
    INNER JOIN CUENTAS c ON hc.num_cuenta = c.num_cuenta
    WHERE c.id_cliente = ?
    ORDER BY hc.id_historial DESC
    LIMIT 5;
  `;

  db.query(sql, [clienteId], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Últimas Operaciones</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #2980b9; color: #fff; }
          tr:nth-child(even) { background: #f9f9f9; }
        </style>
      </head>
      <body>
        <h2>Últimas 5 operaciones del cliente ${clienteId}</h2>
        <table>
          <tr>
            <th>Número de Cuenta</th>
            <th>Moneda</th>
            <th>Balance</th>
            <th>Monto</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Concepto</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.num_cuenta}</td>
          <td>${op.moneda}</td>
          <td>${op.balance}</td>
          <td>${op.monto}</td>
          <td>${op.tipo}</td>
          <td>${op.estado_op}</td>
          <td>${op.concepto}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 2. Pantalla principal cajero automático: retornar el Nombre
//  del cliente, el número de la tarjeta, el número de cuenta y la
//  moneda de todas las cuentas correspondientes a la tarjeta introducida.

// Pantalla principal cajero automático
exports.getInfoCajero = (req, res) => {
  const tarjetaId = req.params.num_tarjeta;
  const sql = `
    SELECT cl.nombre, cl.ap_pat, cl.ap_mat, t.num_tarjeta, c.num_cuenta, c.moneda
    FROM TARJETAS t
    INNER JOIN CLIENTES cl ON t.id_cliente = cl.id_cliente
    INNER JOIN CUENTA_TARJETA ct ON t.num_tarjeta = ct.num_tarjeta
    INNER JOIN CUENTAS c ON ct.num_cuenta = c.num_cuenta
    WHERE t.num_tarjeta = ?;
  `;

  db.query(sql, [tarjetaId], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Info Cajero</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #27ae60; color: #fff; }
          tr:nth-child(even) { background: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Información del Cajero para tarjeta ${tarjetaId}</h2>
        <table>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Número Tarjeta</th>
            <th>Número Cuenta</th>
            <th>Moneda</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.nombre}</td>
          <td>${op.ap_pat}</td>
          <td>${op.ap_mat}</td>
          <td>${op.num_tarjeta}</td>
          <td>${op.num_cuenta}</td>
          <td>${op.moneda}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 3. Pantalla de la cuenta - app movil
exports.getCuentaDetalle = (req, res) => {
  const cuentaId = req.params.num_cuenta;
  const sql = `
    SELECT c.num_cuenta, c.moneda, c.tipo, c.balance, hc.monto, hc.estado_op, hc.tipo
    FROM CUENTAS c
    JOIN HISTORIAL_CUENTA hc ON c.num_cuenta = hc.num_cuenta
    WHERE c.num_cuenta = ?
    ORDER BY hc.id_historial DESC;
  `;

  db.query(sql, [cuentaId], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Detalle Cuenta</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #8e44ad; color: #fff; }
          tr:nth-child(even) { background: #f8f8f8; }
        </style>
      </head>
      <body>
        <h2>Detalle de la Cuenta ${cuentaId}</h2>
        <table>
          <tr>
            <th>N° Cuenta</th>
            <th>Moneda</th>
            <th>Tipo Cuenta</th>
            <th>Balance</th>
            <th>Monto Operación</th>
            <th>Estado</th>
            <th>Tipo Operación</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.num_cuenta}</td>
          <td>${op.moneda}</td>
          <td>${op.tipo}</td>
          <td>${op.balance}</td>
          <td>${op.monto}</td>
          <td>${op.estado_op}</td>
          <td>${op.tipo}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 4. Extracto por rango
exports.getExtractoRango = (req, res) => {
  const { cuentaId, min, max } = req.params;
  const sql = `
    SELECT hc.tipo, hc.medio_transf, hc.concepto, hc.estado_op, hc.monto
    FROM HISTORIAL_CUENTA hc
    WHERE hc.num_cuenta = ? AND hc.monto BETWEEN ? AND ?;
  `;

  db.query(sql, [cuentaId, min, max], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Extracto por Rango</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #d35400; color: #fff; }
          tr:nth-child(even) { background: #f6f6f6; }
        </style>
      </head>
      <body>
        <h2>Extracto de Cuenta ${cuentaId} (Rango: ${min} - ${max})</h2>
        <table>
          <tr>
            <th>Tipo</th>
            <th>Medio</th>
            <th>Concepto</th>
            <th>Estado</th>
            <th>Monto</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.tipo}</td>
          <td>${op.medio_transf}</td>
          <td>${op.concepto}</td>
          <td>${op.estado_op}</td>
          <td>${op.monto}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 5. Extracto retiros
exports.getExtractoRetiros = (req, res) => {
  const cuentaId = req.params.num_cuenta;
  const sql = `
    SELECT hc.medio_transf, hc.concepto, hc.estado_op, hc.monto
    FROM HISTORIAL_CUENTA hc
    WHERE hc.num_cuenta = ? AND hc.tipo = 'retiro';
  `;

  db.query(sql, [cuentaId], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Extracto Retiros</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #c0392b; color: #fff; }
          tr:nth-child(even) { background: #f5f5f5; }
        </style>
      </head>
      <body>
        <h2>Retiros de la Cuenta ${cuentaId}</h2>
        <table>
          <tr>
            <th>Medio</th>
            <th>Concepto</th>
            <th>Estado</th>
            <th>Monto</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.medio_transf}</td>
          <td>${op.concepto}</td>
          <td>${op.estado_op}</td>
          <td>${op.monto}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 6. Extracto exitosas > 100
exports.getExtractoExitosas = (req, res) => {
  const cuentaId = req.params.num_cuenta;
  const sql = `
    SELECT hc.medio_transf, hc.concepto, hc.estado_op, hc.monto, hc.num_cuenta
    FROM HISTORIAL_CUENTA hc
    WHERE hc.num_cuenta = ? AND hc.estado_op = 'exitosa' AND hc.monto > 100;
  `;

  db.query(sql, [cuentaId], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Operaciones Exitosas</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #16a085; color: #fff; }
          tr:nth-child(even) { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h2>Operaciones Exitosas &gt; 100 - Cuenta ${cuentaId}</h2>
        <table>
          <tr>
            <th>Medio</th>
            <th>Concepto</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>N° Cuenta</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.medio_transf}</td>
          <td>${op.concepto}</td>
          <td>${op.estado_op}</td>
          <td>${op.monto}</td>
          <td>${op.num_cuenta}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 7. Pantalla usuario - app móvil
exports.getUsuarioInfo = (req, res) => {
  const usuario = req.params.nombre_user;
  const sql = `
    SELECT u.nombre_user, u.estado_notif, cl.telefono, cl.correo, cl.nombre, cl.ap_pat, cl.ap_mat, cl.id_cliente
    FROM USUARIO u
    JOIN CLIENTES cl ON u.id_cliente = cl.id_cliente
    WHERE u.nombre_user = ?;
  `;

  db.query(sql, [usuario], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Usuario</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #34495e; color: #fff; }
          tr:nth-child(even) { background: #efefef; }
        </style>
      </head>
      <body>
        <h2>Información del Usuario: ${usuario}</h2>
        <table>
          <tr>
            <th>Usuario</th>
            <th>Notificaciones</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Nombre(s)</th>
            <th>Apellido Pat.</th>
            <th>Apellido Mat.</th>
            <th>ID Cliente</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.nombre_user}</td>
          <td>${op.estado_notif}</td>
          <td>${op.telefono}</td>
          <td>${op.correo}</td>
          <td>${op.nombre}</td>
          <td>${op.ap_pat}</td>
          <td>${op.ap_mat}</td>
          <td>${op.id_cliente}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};

// 8. Pantalla info tarjeta
exports.getTarjetaInfo = (req, res) => {
  const tarjetaId = req.params.num_tarjeta;
  const sql = `
    SELECT t.num_tarjeta, t.fecha_venc, t.limite_retiro, c.num_cuenta, c.moneda
    FROM TARJETAS t
    JOIN CUENTA_TARJETA ct ON t.num_tarjeta = ct.num_tarjeta
    JOIN CUENTAS c ON ct.num_cuenta = c.num_cuenta
    WHERE t.num_tarjeta = ?;
  `;

  db.query(sql, [tarjetaId], (err, results) => {
    if (err) return res.status(500).send(err);

    let html = `
      <html>
      <head>
        <title>Tarjeta Info</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #2c3e50; color: #fff; }
          tr:nth-child(even) { background: #f7f7f7; }
        </style>
      </head>
      <body>
        <h2>Información de la Tarjeta ${tarjetaId}</h2>
        <table>
          <tr>
            <th>N° Tarjeta</th>
            <th>Fecha Venc.</th>
            <th>Límite Retiro</th>
            <th>N° Cuenta</th>
            <th>Moneda</th>
          </tr>
    `;

    results.forEach(op => {
      html += `
        <tr>
          <td>${op.num_tarjeta}</td>
          <td>${op.fecha_venc}</td>
          <td>${op.limite_retiro}</td>
          <td>${op.num_cuenta}</td>
          <td>${op.moneda}</td>
        </tr>
      `;
    });

    html += `</table></body></html>`;
    res.send(html);
  });
};
