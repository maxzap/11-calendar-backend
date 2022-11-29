const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');

// Crar el servidor de express
const app = express();

//database
dbConnection();

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
