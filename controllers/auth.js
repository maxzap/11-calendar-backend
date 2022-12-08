const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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
        
        const usuarioGuardado = await usuario.save();
        // generar JWT
        const token =  await generarJWT( usuario.id, usuario.name );

    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
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
        
        // generar JWT
        const token =  await generarJWT( usuario.uid, usuario.name );


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error al registrar el usuario'
        })
    }
}

const renewToken = async(req, res = response) => {

    const { uid, name } = req;
    const token =  await generarJWT( uid, name );
    
    res.json({
        ok: true,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}