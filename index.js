const express = require('express');
const path = require('path');
require('dotenv').config();


//DB CONFIG
const {dbConnection } = require('./database/config');
dbConnection(); 


//APP DE EXPRESS
const app = express();

//LECTURA Y PARSEO DEL BODY (NOTA: Middleware, funcion que se ejecuta cuando pasa por aqui el codigo)
app.use(express.json());


//NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets')


//Path publico
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

//MIS RUTAS
app.use('/api/login',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/mensajes',require('./routes/mensajes'));



server.listen(process.env.PORT,( err )  => {

    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto!!!,',process.env.PORT);

});
