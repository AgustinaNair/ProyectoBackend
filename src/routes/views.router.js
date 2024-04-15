import { Router } from 'express'

const router = Router()

const products = [
    {id:1 , nombre: purulo},
    {id:2 , nombre: purulo},
    {id:3 , nombre: purulo},
    {id:4 , nombre: purulo},
    {id:5 , nombre: purulo},
]
const user = {
    username: 'juancito',
    apellido: 'perez',
    role: 'admin'
}
//endpoint de una ruta raiz
router.get ('/', (req, res) => {
    res.render('home',{
        user: user.username,
        apellido: user.apellido,
        role: user.role ==='admin',
        title: 'mercado',
        products,
        styles: 'homeStyles.css'
    })
})

router.get('/chat', (req,res)=>{
    res.render('chat', {
        styles: 'homeStyles.css'
    })
})
export default router