/**
 * Rutas de Usuarios / Events
 * host + /api/events
 * TODO: Login, Registro, Renew token
 */


const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use( validarJWT );

// Obtener eventos
router.get( '/', getEventos );

// Crear un evento
router.post( '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos,
    ],
    crearEvento );

// Actualizar un evento
router.put( '/:id', [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos,
    ],
    actualizarEvento );

// Eliminar un evento
router.delete( '/:id', eliminarEvento );


module.exports = router;

