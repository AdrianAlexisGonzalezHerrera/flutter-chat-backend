//const { Console } = require('console');
//const { Console } = require('console');
const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

//   App De Express
const app = express();

// Lectura y Parseo Del Body
app.use( express.json() );


// Node Serve
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');







// Path Público
const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static( publicPath ) );



// Mis Rutas
app.use( '/api/login', require('./routes/auth') );




// app.listen( process.env.PORT, ( err ) => {
server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error( err );

    console.log(`Servidor Corriendo En Puerto`, process.env.PORT );
});