//const { Client } = require('socket.io/dist/client');
const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
// const { Client } = require('socket.io/dist/client');

//   Mensajes De Sockets
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    // client.on('disconnect', () => { /* … */ });
    console.log('Cliente Conectado');

    // console.log( client.handshake.headers[ 'x-token' ] );
    const [ valido, uid ] = comprobarJWT( client.handshake.headers[ 'x-token' ] );

    //* Verificar Autenticación
    // console.log( valido, uid );
    if ( !valido ) { return client.disconnect(); }

    //* Cliente Autenticado
    usuarioConectado( uid );

    //* Ingresar Al Usuario A una Sala En Particular
    // Sala Global, Client.id, 650c04b46e56b8365b06fb89
    
    client.join( uid );

    //* Escuchar Del Cliente El  Mensaje-Personal
    
    client.on( 'mensaje-personal', async ( payload ) => {
        // console.log( payload );
        await grabarMensaje( payload );
        io.to( payload.para ).emit( 'mensaje-personal', payload );
    } );
    


    
    // console.log('Cliente Autenticado')


    client.on('disconnect', () => { 
        console.log('Cliente Desconectado');
        usuarioDesconectado( uid );
    });

    //client.on('mensaje', ( payload ) => {
    //    console.log( 'Mensaje', payload );
    //
    //    io.emit( 'mensaje', { admin: 'Nuevo Mensaje' } );
    //})
});