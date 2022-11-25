const express = require('express');

// Crar el servidor de express
const app = express();

// Rutas


// Directorio publico

app.use( express.static('public') );

// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// });

// Escuchar peticiones
app.listen( 4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});
