const { response } = require("express")



const getEventos = async(req, res = response ) => {
    return res.json({
        ok: true,
        msg: 'getEventos'   
    })
}

const crearEvento = async(req, res = response ) => {

    //En primera instancia necesito validar que el request tengo el evento.
    console.log( req.body )

    return res.json({
        ok: true,
        msg: 'crearEvento'   
    })
}

const actualizarEvento = async(req, res = response ) => {
    return res.json({
        ok: true,
        msg: 'actualizarEvento'   
    })
}

const eliminarEvento = async(req, res = response ) => {
    return res.json({
        ok: true,
        msg: 'eliminarEvento'   
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}