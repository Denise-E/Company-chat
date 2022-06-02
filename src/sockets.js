module.exports = (io) =>{

    let nickNames = [];

    io.on('connection', socket =>{
        console.log('Nuevo usuario conectado');

        socket.on('enviar mensaje', (datos) =>{
            //console.log(datos);
            //Lo envía a todos los clientes !! (ajustar)
            io.sockets.emit('nuevo mensaje', {
                msg: datos,
                nick: socket.nickname
            });
        });


        socket.on('nuevo usuario', (datos, callback) => {

            if(nickNames.indexOf(datos) != -1){
                callback(false);
            }else{
                //Si no existe el usuario se agrega uno nuevo
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);
                actualizarUsuarios();
            }
        });

        socket.on('disconnect', datos =>{
            //Eliminamos del array usuarios desconectados
            if(!socket.nickname){
                return;
            }else{
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                actualizarUsuarios();
            }
        });

        function actualizarUsuarios(){
            io.sockets.emit('usernames', nickNames);
        }
    });
}