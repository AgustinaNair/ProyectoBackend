import { userService, cartService } from "../service/index.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken, decodificaToken } from "../config/index.js";
import UserCurrentDto from "../dtos/usersCurrent.dto.js";
import { CustomError } from "../service/errors/CustomError.js";
import { generateUserError } from "../service/errors/info.js";
import { EError } from "../service/errors/enums.js";
import { logger } from "../utils/logger.js";
class SessionsController {
    constructor() {
        this.userService     = userService
        this.cartService     = cartService
        this.createHash      = createHash
        this.isValidPassword = isValidPassword
        this.generateToken   = generateToken
        this.decodificaToken = decodificaToken
    }

    githubSessions       = async (req, res)=>{}

    githubCallSessions   = (req,res) =>{
        req.session.user = req.user
        res.redirect('/products')
    }

    emailSessions        = async (req,res)=>{
        const{email} = req.body
        if(!email ) return res.send({status:'error', error:'Por favor escribe tu email para recuperar tu cuenta'})
        const result = await this.userService.getUser({email})
        if(!result) return res.status(401).send({status:'error', error:'Usuario incorrecto'})
    
        const token = this.generateToken({
            email,
            first_name: result.first_name,
            last_name: result.last_name,
            id: result._id,
            role: result.role
        })
        
        res.cookie('token', token, {
            maxAge: 3600,
            httpOnly: true
        })
        sendEmail({
            email: user.email,
            subject: 'Email de recuperación',
            html: `
            <h1>Hola ${result.first_name}</h1>
            <p>Para recuperar tu cuenta, haz click en el siguiente enlace:</p>
            <a href="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${token}">Recuperar cuenta</a>
                        `
        })
        res.send({status:'success', message: 'email enviado'})
    }
    


    registerSessions     =  async(req, res, next) => {
        try{
            const{email, password, first_name, last_name, age} = req.body
            if(!email || !password || !first_name || !last_name || !age) {
                CustomError.createError({
                    name: 'Error al crear un usuario',
                    cause: generateUserError( {first_name, last_name, email}),
                    message: 'Error al crear un usuario',
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const userExist = await this.userService.getUser({email})
            if(userExist) return res.send({status:'error', error:'usuario ya existe'})
            const cart = await this.cartService.addCart()
            const cartId = cart._id
            let newUser= {
                first_name,
                last_name,
                age,
                email,
                password: this.createHash(password),
                cartId
            }
    
            if(email === process.env.USER_ADMIN || password === process.env.USER_PASS) {
                newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: this.createHash(password),
                    cartId,
                    role:'admin'
                }
            }else{
                newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: this.createHash(password),
                    cartId
                }
            }
                    
            const result = await this.userService.createUser(newUser)
            const fecha = Date.now()
            await this.userService.conexionUser(email, fecha)  
            const token = this.generateToken({
                email,
                id: result._id
            })
            res.cookie('token', token, {
                maxAge: 60*60*1000*24,
                httpOnly: true
            }). send({status:'success', message: 'usuario registrado' })
    
        } catch (error){
            next(error)
        }
        
    }

    loginSessions        = async  (req, res) => {
        const{email, password} = req.body
        if(!email || !password) return res.send({status:'error', error:'faltan datos, completar campos'})
        const result = await this.userService.getUser({email})
        if(!result) return res.status(401).send({status:'error', error:'Usuario incorrecto'})
    
        if(!this.isValidPassword({password :result.password}, password)) return res.status(401).send({status:'error', error:'password incorrecto'})

        const fecha = Date.now()
        await this.userService.conexionUser(email, fecha)           
        
        const token = this.generateToken({
            email,
            first_name: result.first_name,
            last_name: result.last_name,
            id: result._id,
            role: result.role,
            cartId: result.cartId
        })
        
        res.cookie('token', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        }).redirect('/products')
    }

    failRegisterSessions = async (req,res) =>{
        logger.info('fallo el registro')
        res.send({status:'error', error:'fallo el registro'})
    }

    failLoginSessions    = (req,res) =>{
        res.send({error: 'fallo el login'})
    }
    
    currentSessions      = async (req, res) => {
        // console.log(req.user)
        const userDto = new UserCurrentDto(req.user)
        res.send(userDto)
    }

    logoutSessions       = async(req, res) => {
        const tokenviejo = this.decodificaToken(req.cookies.token)

        const fecha = Date.now()
        console.log(tokenviejo)
        await this.userService.conexionUser(tokenviejo.email, fecha)
        const token = this.generateToken({
            role: 'Sin Logearse'
        })
        res.cookie('token', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        })
        req.session.destroy(err => {
            if(!err) return res.render('login')
            else return res.send({status:'Error', error:err})
        })
    }
}

export default SessionsController;