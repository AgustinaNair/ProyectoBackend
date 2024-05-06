import {Router} from 'express'
import ProductManager from '../dao/Dao/ProductManager.js'
import productsModel from '../dao/models/products.model.js'

const router = Router()

let products =[]
const {getProduct, addProduct, getProductById, updateProduct, deleteProduct} = new ProductManager('./products.json')

router.get('/', async(req, res) => {
    const products = await productsModel.find({})
    res.send({status:'success', payload:products})

    // Para usar persistencia en archivos:
    // const {limit} = req.query
    // const result= await getProduct(limit)
    // res.send(result)
})
router.get('/:pid', async(req, res) => {
    const {pid} = req.params
    const products = await productsModel.findOne({_id: pid})
    res.send({ status:'success', payload: products})

    // Para usar con persistencia en archivos
    // const {pid} = req.params
    // const result = await getProductById(pid)
    // res.send({status:'success', payload: result})
})

router.post('/', async(req, res) => {

    const {title, description, price, thumbnail, code, stock, category} = req.body
    if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
    const result = await productsModel.create(req.body)
    res.send({status:'success', payload:result})

    // Para usar persistencia en archivos
    // const result = await addProduct(req.body)
    req.io.emit('producto-agregado', result)
    // res.send({status: 'success', payload: result})
})
router.put('/:pid', async(req,res)=>{
    const {pid} = req.params
    const {title, description, price, thumbnail, code, stock, category} = req.body
    if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
    const result = await productsModel.updateOne({_id: pid}, {$set: {title, description, price, thumbnail, code, stock, category}})
    
        //     Para usar persistencia en archivos
    // const result = await updateProduct(pid, {title, description, price, thumbnail, code, stock, category})
    req.io.emit('producto-actualizado', result)
    res.send({status:'success', payload: result})
})
router.delete('/:pid', async(req,res) =>{
    const {pid} = req.params
    const result = await productsModel.findByIdAndDelete(pid)

    //     Para usar persistencia en archivos
    // const result = await deleteProduct(pid)
    req.io.emit('producto-eliminado', result)
    res.send({status:'success', payload: result})
})
export default router