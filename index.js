const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// conectar a la db
conectarDB();

// habilitar cors
//app.use(cors({ credentials: true, origin: true }));
app.use(cors());

// habilitar express.json
app.use(express.json({extended: true}));

// puerto del servidor (app)
const port = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));
app.use('/api/consumos', require('./routes/consumos'));

// arrancar el servidor (app)
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});