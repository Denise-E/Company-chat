$(function(){
    const socket = io();
    var nick = '';
    
    const messageForm = $('#sendForm');
    const messageBox = $('#message');
    const chat = $('#chat');


    messageForm.submit( e =>{
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        //Para limpiar el imput después del envio
        messageBox.val('');
    });

    //Obtengo respuesta del servidor:
    socket.on('nuevo mensaje', function(datos){
        let color = '#f5f4f4';
        if(nick == datos.nick){
            color = '#9ff4c5';
        }
        
        chat.append(`
        <div class="msg-area mb-2" style="background-color:${color}">
            <p class="msg"><b>${datos.nick} :</b> ${datos.msg}</p>
        </div>
        `);

    });
});