var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicletaControllerAPI');
var usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuarios_list);
router.post('/create', bicicletaController.bicicleta_create);
router.delete('/delete', bicicletaController.bicicleta_delete);
router.put('/update', bicicletaController.bicicleta_update);
module.exports = router;

