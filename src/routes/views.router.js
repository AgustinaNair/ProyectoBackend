import { Router } from 'express'
import ProductDao from '../daos/Dao/ProductDao.js'
import { Server } from 'socket.io';
import ProductMongoManager from '../daos/Dao/ProductMongo.Dao.js';
import CartMongoDao from '../daos/Dao/CartMongo.Dao.js'
import { authorization } from '../middlewares/authorization.middleware.js';
import { passportCall } from '../middlewares/passportCall.middleware.js';
import { generarProducts } from '../utils/generarproducts.js';
import { logger } from '../utils/logger.js';
import { UsersDaoMongo } from '../daos/Dao/UsersDaoMongo.js';
import { generateToken, decodificaToken } from "../config/index.js";

const productService = new ProductMongoManager
const cartService = new CartMongoDao
const userService = new UsersDaoMongo


const router = Router()

const products = []


 
// endpoint en ruta raíz
router.get('/', (req, res)=>{
    res.render('home')
})

router.get('/products', async (req, res)=>{
    const {limit, numPage, sort, query} = req.query
    const {docs, page, hasPrevPage, hasNextPage, prevPage, nextPage} = await productService.getProduct({limit, numPage, sort, query})
    const token = req.cookies.token
    const user = decodificaToken(token)
    const userNombre = user && user.first_name ? user.first_name : '';
    const userExist = user.first_name ? true : false;
    const cart = user && user.cartId ? user.cartId : '';
    res.render('products', {
        products: docs,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user: userNombre,
        userExist,
        cart
    });
    
})
router.get('/users', passportCall('jwt'), authorization('admin'), async (req, res)=>{
    const users = await userService.getUsers()
    const plainUsers = users.map(user => user.toObject());
    res.render('users', {
        users: plainUsers
    });
    
})
router.get('/mockingproducts', async (req, res)=>{
    const {limit, numPage, sort, query} = req.query
    let products = []
    for(let i=0; i<100; i++){
        products.push(generarProducts())
    }
    const userNombre = req.session.user && req.session.user.nombre ? req.session.user.nombre : '';
    const userExist = req.session.user ? true : false;
    res.render('mockingproducts', {
        products,
        user: userNombre,
        userExist
    });
})
router.get('/chat', passportCall('jwt'), authorization('user'), (req,res)=>{
    res.render('chat')
})
router.get('/cart/:cid', async (req,res)=>{
    const{cid} = req.params
    const cart = await cartService.getCartById(cid)
 
    res.render('cart', {
        cid,
        products: cart.products
    })
})
router.get('/login', (req,res)=>{
    res.render('login')
})
router.get('/register', (req,res)=>{
    res.render('register')
})
router.get('/documents/:uid',(req, res)=>{
    const{uid} = req.params
    res.render('documents', {
        uid
    })
})
export default router