import {Router} from 'express'
import ProductController from '../../controllers/products.controller.js'
import { authorization } from '../../middlewares/authorization.middleware.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'

const router = Router()
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = new ProductController()

router.get('/',        getProducts)
router.get('/:pid',    getProduct)
router.post('/',       passportCall('jwt'), authorization(['admin','premium']), createProduct)
router.put('/:pid',    passportCall('jwt'), authorization(['admin','premium']), updateProduct)
router.delete('/:pid', passportCall('jwt'), authorization(['admin','premium']), deleteProduct)

export default router