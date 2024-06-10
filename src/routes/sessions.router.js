import { Router } from "express";
import {UsersManagerMongo} from '../dao/Dao/UsersManagerMongo.js'
import { auth } from "../middlewares/auth.middleware.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import CartMongoManager from "../dao/Dao/CartMongo.Manager.js";

const router = Router()
const userService = new UsersManagerMongo()
const cartService = new CartMongoManager()

router.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res)=>{})


router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req,res) =>{
    req.session.user = req.user
    res.redirect('/products')
})







router.post('/register', async(req, res) => {
    try{
        const{email, password, first_name, last_name, age} = req.body
        if(!email || !password || !first_name || !last_name || !age) return res.status(401).send({status:'error', error:'faltan datos, completar campos'})
        const userExist = await userService.getUserBy({email})
        if(userExist) return res.send({status:'error', error:'usuario ya existe'})
        const cart = await cartService.addCart()
        const cartId = cart._id
        let newUser= {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cartId
        }

        if(email === 'adminCoder@coder.com' || password === 'adminCod3r123') {
            newUser = {
                first_name,
                last_name,
                age,
                email,
                password: createHash(password),
                cartId,
                role:'admin'
            }
        }else{
            newUser = {
                first_name,
                last_name,
                age,
                email,
                password: createHash(password),
                cartId
            }
        }
                
        const result = await userService.createUser(newUser)
        const token = generateToken({
            email,
            id: result._id
        })
        res.cookie('token', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        }). send({status:'success', message: 'usuario registrado' })

    } catch (error){
        console.log(error)
    }
    
})

router.post('/login', async  (req, res) => {
    const{email, password} = req.body
    if(!email || !password) return res.send({status:'error', error:'faltan datos, completar campos'})
    const result = await userService.getUserBy({email})
    if(!result) return res.status(401).send({status:'error', error:'Usuario incorrecto'})

    if(!isValidPassword({password :result.password}, password)) return res.status(401).send({status:'error', error:'password incorrecto'})
    
    const token = generateToken({
        email,
        first_name: result.first_name,
        id: result._id,
        role: result.role
    })
    res.cookie('token', token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    }).redirect('/products')
})

router.post('/failregister',async (req,res) =>{
    console.log('fallo el registro')
    res.send({status:'error', error:'fallo el registro'})
})


router.post('/faillogin', (req,res) =>{
    res.send({error: 'fallo el login'})
})

router.get('/current', passportCall('jwt'),authorization('admin'), async (req, res) => {
    res.send('datos sencibles')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) return res.render('login')
        else return res.send({status:'Error', error:err})
    })
})



export default router