import { Router } from 'express'
import ProductManager from '../dao/Dao/ProductManager.js'
import { Server } from 'socket.io';

const {getProduct} = new ProductManager('./products.json')

const router = Router()

const products = []


 
// endpoint en ruta raíz
router.get('/', (req, res)=>{
    res.render('home', { 
        
        role: 'admin',
        title: 'mercadito || Fede',
        products
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
    const products = await getProduct()
    // console.log(req.io)

    res.render('products', {
        products
    })
})
export default router