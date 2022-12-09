const { response } = require("express")
const Evento = require("../models/Evento")



const getEventos = async(req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    return res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async( req, res = response ) => {

    //En primera instancia necesito validar que el request tengo el evento.
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            of: false,
            msg: 'Error al guardar el evento'
        })
    }
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