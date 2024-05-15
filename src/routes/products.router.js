import {Router} from 'express'
import ProductMongoManager from '../dao/Dao/productMongo.Manager.js'

const router = Router()

let products =[]
const {getTodosProducts, addProduct, getProductById, updateProduct, deleteProduct} = new ProductMongoManager()

router.get('/', async(req, res) => {
    const products = await getTodosProducts()
    res.send({status:'success', payload:products})
})

router.get('/:pid', async(req, res) => {
    const {pid} = req.params
    const result = await getProductById(pid)
    res.send({status:'success', payload: result})
})

router.post('/', async(req, res) => {
    const {title, description, price, thumbnail, code, stock, category} = req.body
    if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
    const result = await addProduct(req.body)
    req.io.emit('producto-agregado', result)
    res.send({status: 'success', payload: result})
})

router.put('/:pid', async(req,res)=>{
    const {pid} = req.params
    const {title, description, price, thumbnail, code, stock, category} = req.body
    if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
    
    const result = await updateProduct(pid, {title, description, price, thumbnail, code, stock, category})
    req.io.emit('producto-actualizado', result)
    res.send({status:'success', payload: result})
})

router.delete('/:pid', async(req,res) =>{
    const {pid} = req.params
    const result = await deleteProduct(pid)
    req.io.emit('producto-eliminado', result)
    res.send({status:'success', payload: result})
})
export default router