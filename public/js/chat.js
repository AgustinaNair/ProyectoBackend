import { logger } from "../../src/utils/logger.js"

const socket = io()
const input = document.getElementById('message')
const messageList = document.getElementById('list-message')

let user

Swal.fire({
    title: 'Ingresa tu nombre',
    input: 'text',
    inputValidator: value => {
        return !value && 'Necesitas ingresar tu nombre'
    },
    allowOutsideClick: false,
    icon: 'success'
})
.then (result =>{
    user = result.value
})

input.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        if(input.value.trim() !== ''){
            socket.emit('mensaje_cliente', {user, message: input.value})
            input.value=''
        }
    }  
})

socket.on('messages_server', data=>{
    const messageLog = document.getElementById('message-log')
    let messages = ''
    data.forEach(message=>{
        messages += `<li>${message.user}: ${message.message}</li>`
    })
    logger.info(messages)
    messageLog.innerHTML = messages
})

