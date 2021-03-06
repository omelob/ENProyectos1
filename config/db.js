const mongoose = require('mongoose');
//collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); // detiene la app por error
    }
}

module.exports = conectarDB;