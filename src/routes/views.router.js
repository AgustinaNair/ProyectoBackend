import { Router } from 'express'
import ProductManager from '../manages/ProductManager.js'
const {getProduct} = new ProductManager('./products.json')

const router = Router()



const products = [
    {id: '1', title: 'producto 1', precio: '100'},
    {id: '2', title: 'producto 2', precio: '101'},
    {id: '3', title: 'producto 3', precio: '102'},
    {id: '4', title: 'producto 4', precio: '103'},
    {id: '5', title: 'producto 5', precio: '104'}    
]

const user = {
    username: 'federicoosandon',
    nombre: 'fede',
    apellido: 'osandon',
    role: 'user'
}
 
// endpoint en ruta raíz
router.get('/', (req, res)=>{
    res.render('home', { 
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role === 'admin',
        title: 'mercadito || Fede',
        products,
        styles: 'homeStyles.css' 
    })
})

router.get('/chat', (req,res)=>{
    res.render('chat', {
        styles: 'homeStyles.css'
    })
})
// router.get('/', (req,res) => {
//     res.render('index',{})
// })
router.get('/products', async(req,res )=>{
// const products = await getProduct()
// console.log(req.io)

    res.render('products', {
        
    })
})
export default router