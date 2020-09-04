//funcion para exportar el modulo al index.js
module.exports = io => {


    let nombresUsuarios = [];
    let usuarioActivo = '';

    //detectamos cuando hay una nueva coneccion de un usuario con el servidor
    io.on('connection', socket => {

        //un cliente envia un mensaje al servidor
        socket.on('enviar mensaje', (data) => {
            //el servidor devuelve a todos los clientes los datos de ese mensaje
            io.sockets.emit("mensaje nuevo", {
                msj: data,
                nick: socket.nickname
            });
        });

        //un cliente se registra con un nombre de usuario
        socket.on("enviar usuario", (data, cb) => {
            //corroboramos si el nombre de usuario ingresado ya existe o no
            if (nombresUsuarios.indexOf(data) !== -1) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                nombresUsuarios.push(socket.nickname);
                usuarioActivo = data;
                actualizarUsuarios();
            }
        });

        socket.on('disconnect', data => {
            if (!socket.nickname) { return };
            nombresUsuarios.splice(nombresUsuarios.indexOf(socket.nickname), 1);
            actualizarUsuarios()
        })


        function actualizarUsuarios() {
            io.sockets.emit("usuario nuevo", nombresUsuarios);
        }

    });
}