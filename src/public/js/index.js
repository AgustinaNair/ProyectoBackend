const socket = io()
let user
// nose si necesito poner algo para que ande eso de abajo
Swal.fire({
    title:'Identificate',
    input: 'text',
    text:'Ingresa el usuario para identificarte en el chat',
    iconValidator: () =>{
        return !value && 'necesitas el nombre de usuario para continuar'
    },
    allowOutsideClick: false
})
.then(result =>{
    user = result.value
    // console.log(user)
})
// input del chat
let chatBox = document.querySelector('#chatbox')
chatBox.addEventListener('keyup',(evt)=>{
    if(evt.key==='Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', { user, message: chatBox.value})
            chatBox.value=''
        }
    }
} )
socket.on('messageLogs', data=>{
    console.log('mensajesz del server', data)
    let log = document.querySelector('#messageLog')
    let messages =''
    data.array.forEach(message => {
        messages+= `${message.user} dice: ${message.message}<br>`
    });
})