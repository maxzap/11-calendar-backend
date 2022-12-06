/**
 * Rutas de Usuarios / Events
 * host + /api/events
 * TODO: Login, Registro, Renew token
 */


const { Router } = require("express");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use( validarJWT );

router.get( '/', getEventos );
router.post( '/', crearEvento );
router.put( '/:id', actualizarEvento );
router.delete( '/:id', eliminarEvento );


module.exports = router;

