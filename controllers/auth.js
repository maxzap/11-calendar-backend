const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg:'El correo ya se encuentra registrado'
            });
        }
        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

    
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error al registrar el usuario'
        })
    }

}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg:'No existe usuario con ese email'
            });
        }

        // Confirmar password.
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generear JWT

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error al registrar el usuario'
        })
    }
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}