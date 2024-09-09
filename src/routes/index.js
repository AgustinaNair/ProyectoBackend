import { Router } from "express"
import sessionRouter from './api/sessions.router.js'
import pruebasRouter from './api/pruebas.js'
import productsRouter from './api/products.router.js'
import cartsRoutes from './api/carts.router.js'
import viewsRuter from './views.router.js'
import usersRouter from './api/users.router.js'
import { uploader } from '../utils.js'

const router = Router()
router.use('/subir-archivo', uploader.single('myFile'), (req,res)=>{
    if (!req.file){
        return res.send('no se pudo subir el archivo')
    }
    res.send('archivo subido')
})
router.use('/', viewsRuter)
router.use('/pruebas', pruebasRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRoutes)
router.use('/api/sessions', sessionRouter)
router.use('/api/users', usersRouter)

export default router