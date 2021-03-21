const mongoose = require('mongoose');

const ConsumoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    potencia: {
        type: Number,
        default: 0
    },
    uso: {
        type: Number,
        default: 0
    },
    consumoE: {
        type: Number,
        default: 0
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});

module.exports = mongoose.model('Consumo', ConsumoSchema);