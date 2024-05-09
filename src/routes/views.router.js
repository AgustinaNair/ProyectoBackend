import { Router } from 'express'
import ProductManager from '../dao/Dao/ProductManager.js'
import { Server } from 'socket.io';
import ProductMongoManager from '../dao/Dao/productMongo.Manager.js';

const productService = new ProductMongoManager

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
router.get('/products', async (req, res)=>{
    const {limit, numPage, sort, query} = req.query
    const {docs, page, hasPrevPage, hasNextPage, prevPage, nextPage} = await productService.getProduct({limit, numPage, sort, query})
    // console.log(respuesta)
    res.render('products', {
        products:docs, page, hasPrevPage, hasNextPage, prevPage, nextPage
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

export default router