const Consumo = require('../models/Consumo');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


// crea un nuevo consumo
exports.crearConsumo = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    
    try {
        
        // Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // creamos el consumo
        const consumo = new Consumo(req.body);
        await consumo.save();
        res.json({consumo});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// obtener consumos por proyecto
exports.obtenerConsumos = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;
        // antes req.body
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // obtener los consumos del proyecto
        const consumos = await Consumo.find({ proyecto });
        res.json({ consumos });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
}

// Actualizar consumo
exports.actualizarConsumo = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto, nombre, potencia, uso, consumoE} = req.body;
            
        // revisar si el consumo existe
        let consumo = await Consumo.findById(req.params.id);

        if (!consumo) {
            return res.status(404).json({msg: 'No existe ese consumo'});
        }
        
        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // crear un objeto con la nueva informacion
        const nuevoConsumo = {};
        nuevoConsumo.nombre = nombre;
        nuevoConsumo.potencia = potencia;
        nuevoConsumo.uso = uso;
        nuevoConsumo.consumoE = consumoE;
        
        
        // Guardar el consumo
        consumo = await Consumo.findOneAndUpdate({_id : req.params.id}, nuevoConsumo, {new: true});

        res.json({consumo});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Elimina un consumo
exports.eliminarConsumo = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;
            
        // revisar si el consumo existe
        let consumo = await Consumo.findById(req.params.id);

        if (!consumo) {
            return res.status(404).json({msg: 'No existe ese consumo'});
        }
        
        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        
        // eliminar consumo
        await Consumo.findOneAndRemove({_id: req.params.id});

        res.json({msg: 'Consumo Eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}