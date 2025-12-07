// Conexion a Mysql Base de datos bancoayca

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: '006_banco_laboratorioSemana6'
});

connection.connect(err =>{
    if(err){
        console.error('Error de conexion a la BD: ' + err.stack);
        return;
    }
    console.log("Conectado a Mysql");
});

module.exports = connection;