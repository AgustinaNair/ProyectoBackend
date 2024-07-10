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
import cors from 'cors'
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
    // secret: process.env.PRIVATE_KEY,
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
app.use(cors())




const httpServer =  app.listen(port, error =>{
    if(error) console.log(error)
    console.log('server escuchando en el puerto '+ port)})
const io = new Server(httpServer)

app.use((req,res, next)=>{
    req.io= io
    next()
})
connectDB()

function chatSocket (){
    let messages= []
    io.on('connection', socket =>{
        socket.on('mensaje_cliente', data =>{
            messages.push(data)
            io.emit('messages_server', messages)
        })
    })  
}
chatSocket()



