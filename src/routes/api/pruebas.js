import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import {fork} from 'child_process'

const router = Router()

// function operacioncompleja() {
//     let result = 0
//     for (let i = 0; i > 10e1; 1++){
//         result += 1
//     }
//     return result
// }
router.get('/suma', (req, res) =>{
    const result = operacioncompleja()
    res.send({result})
})
router.get('/simple', (req, res) =>{
    const child = fork('./src/routes/api/operacioncompleja.js')
    child.send('inicia el calculo')
    child.on('message', result =>{
        res.send({result})
    })
})
// endpoint para cookie 
router.get('/setCookie', (req, res) => {
    res.cookie('cookie', 'Unacookie poderosa',{maxAge:10000000000, signed:true}).send('cookie signed')
})
router.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})
router.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookie').send('cookie borrada')
})
// endpoint para session 
router.get('/current', auth, (req, res) => {
    res.send('datos sensibles que solo ve el administrador')
})
router.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`Veces visitado: ${req.session.counter}`)
    }else{
        req.session.counter = 1
        res.send('Bienvenido')
    }
})
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) return res.send('session destruida')
        else return res.send({status:'Error', error:err})
    })
})
export default router