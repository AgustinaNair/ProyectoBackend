
const socket = io()
const input = document.getElementById('message')
const messageList = document.getElementById('list-message')

input.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        socket.emit('mensaje_cliente', input.value)
        input.value=''
    }
    
})
// manager create get
socket.on('message_server', data=>{
    console.log(data)
    // aca poner para que se vea en el html todo
})
// socket.emit('message', 'data en forma de string')

// socket.on('socket_individual', data=>{
//     console.log(data)
// })
// socket.on('para-todos-menos-el-actual', data=>{
//     console.log(data)
// })
// socket.on('eventos-para-todos', data=>{
//     console.log(data)
// })

