import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRoutes from './routes/carts.router.js'
import { uploader } from './utils.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express()
// Guardar en una const el app.listen
const httpServer =  app.listen(8080, error =>{
    if(error) console.log(error)
    console.log('server escuchando en el puerto 8080')})
// Creamos el socket server
const socketServer= new Server (httpServer)
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('src/public'))

// app.get('/', (req,res) => res.send('Bienvenidos'))
// express usa este motor de plantillas
app.engine('handlebars', handlebars.engine())
// setiamos la direccion de las vistar / plantillas
app.set('views', __dirname + '/views')
app.set('views engine', 'handlebars')


app.use('/subir-archivo', uploader.single('myFile'), (req,res)=>{
    if (!req.file){
        return res.send('no se pudo subir el archivo')
    }
    res.send('archivo subido')
})

app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRoutes)

app.use((error, req, res, next ) =>{
    console.log(error)
    res.status(500).send('Error 500 en el server')
})
socketServer.on('connection', socket =>{
    console.log('nuevo cliente conectado')

    // socket.on('message', data =>{
    //     console.log(data)
    // })
    // socket.emit('socket_individual', 'este mensaje solo lo debe recibir los socket')
    // socket.broadcast.emit('para-todos-menos-el-actual', 'este ev lo veran todos los  sockets conectados menos el actual')
    // socketServer.emit('eventos-para-todos', 'mensaje para todos los socket incluido el actal')
    const messages =[]
    // enviar mensajes viejos
    socket.on('mensaje_cliente', data =>{
        console.log(data)
        messages.push({id: socket.id, message: data})
        socketServer.emit('message_server', messages)
    })

})


    // {
    //     "title":"producto prueba cambiado",
    //     "description":"Este es un producto cambiado de prueba", 
    //     "price":"222", 
    //     "thumbnail": "Sin imagen",
    //     "code":"abc12345", 
    //     "stock":"2545",
    //     "category":"abc"
    //  }