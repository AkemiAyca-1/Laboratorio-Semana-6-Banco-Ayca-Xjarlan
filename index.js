const express = require('express');
const app = express();
const bancoRoutes = require('./routes/bancoRoutes');

app.use(express.json());
app.use('/banco', bancoRoutes);

// Resumen
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Banco Ayca API</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        h1 { color: #2c3e50; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #fff; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        th { background: #2980b9; color: #fff; }
        tr:nth-child(even) { background: #f9f9f9; }
        a { color: #2980b9; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>Bienvenido al Banco Ayca</h1>
      <p>Endpoints disponibles:</p>
      <table>
        <tr>
          <th>Descripción</th>
          <th>Endpoint</th>
          <th>Ejemplo</th>
        </tr>
        <tr>
          <td>Últimas operaciones cliente</td>
          <td>/banco/cliente/:id/operaciones</td>
          <td><a href="/banco/cliente/1/operaciones">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Info cajero automático</td>
          <td>/banco/cajero/:num_tarjeta</td>
          <td><a href="/banco/cajero/2001">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Detalle de cuenta</td>
          <td>/banco/cuenta/:num_cuenta</td>
          <td><a href="/banco/cuenta/1001">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Extracto por rango</td>
          <td>/banco/extracto/:cuentaId/:min/:max</td>
          <td><a href="/banco/extracto/1001/100/600">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Extracto solo retiros</td>
          <td>/banco/extracto/retiros/:num_cuenta</td>
          <td><a href="/banco/extracto/retiros/1001">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Extracto exitosas &gt; 100</td>
          <td>/banco/extracto/exitosas/:num_cuenta</td>
          <td><a href="/banco/extracto/exitosas/1001">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Info usuario</td>
          <td>/banco/usuario/:nombre_user</td>
          <td><a href="/banco/usuario/juanp">Ver ejemplo</a></td>
        </tr>
        <tr>
          <td>Info tarjeta</td>
          <td>/banco/tarjeta/:num_tarjeta</td>
          <td><a href="/banco/tarjeta/2001">Ver ejemplo</a></td>
        </tr>
      </table>
    </body>
    </html>
  `);
});




app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
