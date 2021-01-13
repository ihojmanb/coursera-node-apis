var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', ususarioController.usuarios_list);
router.post('/create', usuarioController.usuarios_create);
router.post('/reservar', usuarioController.usuarios_reservar);

module.exports = router;