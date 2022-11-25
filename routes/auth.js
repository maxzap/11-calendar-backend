/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 * TODO: Login, Registro, Renew token
 */

const { Router } = require('express');
const router = Router();



router.get('/', (req, res) => {
    res.json({
        ok: true
    })
});

module.exports = router;