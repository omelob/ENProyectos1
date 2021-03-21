const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// conectar a la db
conectarDB();

// habilitar cors
app.use(cors());

// habilitar express.json
app.use(express.json({extend: true}));

// puerto del servidor (app)
const PORT = process.env.PORT || 4000;

// ejemplo definir la pagina ppal
// app.get('/', (req, res) => {
//     res.send('Hola Mundo')
// });

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));
app.use('/api/consumos', require('./routes/consumos'));

// arrancar el servidor (app)
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});