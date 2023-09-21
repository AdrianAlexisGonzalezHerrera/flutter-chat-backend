const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    
    try {

        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El Email Ya Existe'
            });
            
        }
        
        const usuario = new Usuario( req.body );

        // Encriptar Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );



        await usuario.save();

        // Generar Mi JWT
        const token = await generarJWT( usuario.id );


    
        res.json({
            ok: true,
            msg:  'Crear Usuario!!!!!!!',
            usuario,
            token
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable Con El Administrador'
        })
        
    }

}

const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                // msg: 'El Usuario No Existe'
                msg: 'El Email No Existe'
            });
            
        }

        //*   Validar El Password
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                // msg: 'El Usuario No Existe'
                msg: 'El Password No Es Valido'
            });
        }

        //*   Generer El JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            msg:  'Login',
            usuario: usuarioDB,
            token
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable Con El Administrador'
        })
        
    }
}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    //*   Generat JWT
    const token = await generarJWT( uid );

    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        msg: 'Renew',
        // uid: req.uid,
        usuario,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}