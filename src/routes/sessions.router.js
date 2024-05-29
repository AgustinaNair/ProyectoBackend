import { Router } from "express";
import {UsersManagerMongo} from '../dao/Dao/UsersManagerMongo.js'
import { auth } from "../middlewares/auth.middleware.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";


const router = Router()
const userService = new UsersManagerMongo()

router.post('/register', async(req, res) => {
    try{
        const{email, password, first_name, last_name} = req.body
        if(!email || !password || !first_name || !last_name) return res.send({status:'error', error:'faltan datos, completar campos'})
        const userExist = await userService.getUserBy({email})
        if(userExist) return res.send({status:'error', error:'usuario ya existe'})
        
        let newUser= {}
        if(email === 'adminCoder@coder.com' || password === 'adminCod3r123') {
            newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password),
                role:'admin'
            }
        }else{
            newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }
        }
                
        const result = await userService.createUser(newUser)
        res.send('Usuario registrado')

    } catch (error){
        console.log(error)
    }
    
})

router.post('/login', async  (req, res) => {
    const{email, password} = req.body
    if(!email || !password) return res.send({status:'error', error:'faltan datos, completar campos'})
    const result = await userService.getUserBy({email})
    
    if(!result) return res.status(401).send({status:'error', error:'Usuario incorrecto'})
        // esto se puede hacer porque el password no esta encriptado todavia 
    if(password !== result.password) return res.status(401).send({status:'error', error:'Contraseña incorrecta'})

    if(!isValidPassword(password, {password :result.password})) return res.status(401).send({status:'error', error:'password incorrecto'})
    req.session.user = {
        nombre : result.first_name,
        email,
        admin: result.role === 'admin'
    }
    res.redirect('/products')
})




// minuto 44:36 claseautorizacion y auto..









router.get('/current', auth, (req, res) => {
    res.send('datos sencibles')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) return res.render('login')
        else return res.send({status:'Error', error:err})
    })
})



export default router