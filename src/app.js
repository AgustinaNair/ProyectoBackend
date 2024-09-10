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
import { handleErrors } from './middlewares/errors/index.js'
import { addLogger, logger } from './utils/logger.js'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
const app = express()
const {port} = objectConfig || 8080
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de mi E-commerce',
            description: 'Api detallada para documentar los modulos, productos y carrito'
        }
    },
    apis: [`./src/docs/**/*.yaml`]
}
// app.use (productSocket(io))
const specs = swaggerJsdoc(swaggerOptions)
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
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.set('views', './src/views')
app.use(addLogger)
app.use(routerApp)
app.use(cors())



const httpServer =  app.listen(port, error =>{
    if(error) logger.info(error)
    logger.info('server escuchando en el puerto '+ port)})
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

app.use(handleErrors())