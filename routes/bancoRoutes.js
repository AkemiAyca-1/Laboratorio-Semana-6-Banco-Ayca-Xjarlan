// rutas de la app

const express = require('express');
const router = express.Router();
const bancoController = require('../controllers/bancoController');

// Hay que difninir las rutas
// entdad, que valor se usara (id, num_cuenta, etc), y el controlador + funciones
// 1. Pantalla principal app movil: devolver las ultimas 5 operaciones
router.get('/cliente/:id/operaciones', bancoController.getUltimasOperaciones);
router.get('/cajero/:num_tarjeta', bancoController.getInfoCajero);
router.get('/cuenta/:num_cuenta', bancoController.getCuentaDetalle);
router.get('/extracto/:cuentaId/:min/:max', bancoController.getExtractoRango);
router.get('/extracto/retiros/:num_cuenta', bancoController.getExtractoRetiros);
router.get('/extracto/exitosas/:num_cuenta', bancoController.getExtractoExitosas);
router.get('/usuario/:nombre_user', bancoController.getUsuarioInfo);
router.get('/tarjeta/:num_tarjeta', bancoController.getTarjetaInfo);

module.exports = router;


