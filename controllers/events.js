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

    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Id de evento inexistente'
            })
        };

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Privilegios insuficientes para editar el evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el evento.'
        })
    };
}

const eliminarEvento = async(req, res = response ) => {
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Id de evento inexistente'
            })
        };

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Privilegios insuficientes para eliminar el evento'
            })
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo eliminar el evento.'
        })
    };
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}