//traemos los modulos express y socket.io
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

//los pasamos a variables
const app = express();
const server = http.createServer(app);

//vinculamos a socket.io con el server para enviar y recibir mensajes en tiempo real (libreria de websockets)
const io = socketio.listen(server);

//traemos la funcion hecha en sockets.js (sirve para separar el código y que luego sea escalable)
require('./sockets.js')(io);

//si el entorno a utilizar ya brinda un puerto usar ese, sino el 8080
app.set('port', process.env.PORT || 8080);

//mandamos la carpeta public al servidor (static porque trae archivos estaticos)
app.use(express.static(path.join(__dirname, 'public')));

//puerto en el que va a ejecutarse el servidor
server.listen(app.get('port'), () => {
    console.log("servidor en puerto " + app.get('port'));
});


//RECORDAR QUE ESTA INSTALADA LA DEPENDENCIA NODEMON QUE ACTUALIZA LOS CAMBIOS
//EN EL SERVIDOR SIN NECESIDAD DE INTERRUMPIRLO Y ARRANCARLO DE NUEVO