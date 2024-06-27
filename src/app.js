import express from 'express'
import { __dirname } from './utils.js'
import { engine} from 'express-handlebars'
import { Server } from 'socket.io'
import {connectDB, objectConfig} from './config/index.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
import routerApp from './routes/index.js'

const app = express()
const {port} = objectConfig
// app.use (productSocket(io))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 60*60*1000*24
    }),
    secret: 'Firmasecreta',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')
app.use(routerApp)

const httpServer =  app.listen(port, error =>{
    if(error) console.log(error)
    console.log('server escuchando en el puerto '+ port)})
const io = new Server(httpServer)

// const socketServer= new Server (httpServer)

app.use((req,res, next)=>{
    req.io= io
    next()
})
 
connectDB()
io.on('connection', socket =>{
    console.log('nuevo cliente conectado')
    
    const messages =[]

    socket.on('mensaje_cliente', data =>{
        console.log(data)
        messages.push({id: socket.id, message: data})
        io.emit('message_server', messages)
    })

})
let messages= []

io.on('connection', socket =>{
    console.log('cliente conectado')

    socket.on('message', data=>{
        console.log('message data:', data)
        messages.push(data)
        io.emit('messageLogs', messages)
    })

})

