const express = require('express');
const router = express.Router();
const consumoController = require('../controllers/consumoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear un consumo
// api/consumos
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('potencia', 'La potencia es un valor numérico').isNumeric(),
        check('uso', 'Ei tiempo de uso del aparato es un valor numérico').isNumeric(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    consumoController.crearConsumo
);

// obtener consumos por proyecto
router.get('/',
    auth,
    consumoController.obtenerConsumos
);

// actualizar consumo
router.put('/:id',
    auth,
    consumoController.actualizarConsumo
);

// eliminar consumo
router.delete('/:id',
    auth,
    consumoController.eliminarConsumo
);

module.exports = router;