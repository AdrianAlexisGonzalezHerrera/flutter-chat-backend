const { io } = require('../index');
//   Mensajes De Sockets
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    // client.on('disconnect', () => { /* … */ });
    console.log('Cliente Conectado');

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
    });

    //client.on('mensaje', ( payload ) => {
    //    console.log( 'Mensaje', payload );
    //
    //    io.emit( 'mensaje', { admin: 'Nuevo Mensaje' } );
    //})
});