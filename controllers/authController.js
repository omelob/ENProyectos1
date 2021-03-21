const Usuario = require('../models/Ususario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // extraer email y psw
    const { email, password } = req.body;

    try {
        // revisar que sea un ususario registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        // revisar el psw
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto'});
        }

        // si todo es correcto crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 7200 // 2 horas
        }, (error, token) => {
            if(error) throw error;

            // mensaje de confirmacion
            res.json({ token});
        });

    } catch (error) {
        console.log(error);
    }
}

// obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json ({msg: 'Hubo un error'});
    }
}