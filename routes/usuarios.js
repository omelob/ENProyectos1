// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');

// crea un usuario
// endpoint api/usuarios ('/')
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe tner minimo 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;