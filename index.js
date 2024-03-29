const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

// Crar el servidor de express
const app = express();

//database
dbConnection();

// CORS
// TODO: Buscar videos especializados sobre CORS
app.use(cors())

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );

// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events') );

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
