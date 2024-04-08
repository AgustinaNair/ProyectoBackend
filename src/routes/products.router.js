import {Router} from 'express'

const router = Router()

// router.get('/', (req,res) =>{})
// router.post('/', (req,res) =>{})
let products =[]

router.get('/', async(req, res) => {
    const {limit} = req.query
    const result= await getProduct(limit)
    res.send(result)
})
router.get('/:pid', async(req, res) => {
    const {pid} = req.params
    const result = await getProductById(pid)
    res.send({status:'success', payload: result})
})

router.post('/api/products', async(req, res) => {
    const {title, description, price, thumbnail, code, stock} = req.body
    if(!title || !description || !price || !thumbnail || !code || !stock) return res.send({status: 'error', error: 'faltan datos'})
    
    const result = await addProduct(req.body)
    res.send({status: 'seccess', payload: result})
})


export default router