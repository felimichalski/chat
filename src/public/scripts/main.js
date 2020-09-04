$(() => {
    const socket = io();

    const formMensaje = $("#form-mensaje");
    const mensaje = $("#mensaje");
    const chat = $("#chat");

    const formUsuario = $("#form-usuario");
    const usu = $("#nickname");
    const error = $("#error");

    const usuarios = $("#usuarios");

    formMensaje.submit(e => {
        e.preventDefault();
        socket.emit("enviar mensaje", mensaje.val());
        mensaje.val('');
    });

    socket.on('mensaje nuevo', data => {
        chat.append(`<b>${data.nick}:</b> ${data.msj} <br />`);
    })

    formUsuario.submit(e => {
        e.preventDefault();
        if (usu.val() != "") {
            socket.emit("enviar usuario", usu.val(), data => {
                if (data === false) {
                    error.show()
                    error.html(`
                        <div class="mt-2 alert alert-danger">
                        El nombre de usuario ingresado ya existe, porfavor ingrese otro
                        </div>
                    `);
                } else {
                    $("#container-user").hide()
                    $("#container-chat").show();
                    error.hide();
                }
            });
        } else {
            $("#error").show()
            $("#error").html(`
            <div class="mt-2 alert alert-danger">
            El nombre de usuario no puede estar vacío, porfavor ingrese uno
            </div>
        `);
        }
    });

    socket.on('usuario nuevo', data => {
        let lista = '';
        for (let i = 0; i < data.length; i++) {
            lista += `<p><i class="far fa-user"></i> ${data[i]}</p>`
        }
        usuarios.html(lista);
    })


})