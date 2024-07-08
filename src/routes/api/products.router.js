import {Router} from 'express'
import ProductController from '../../controllers/products.controller.js'
import { authorization } from '../../middlewares/authorization.middleware.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { auth } from '../../middlewares/auth.middleware.js'

const router = Router()
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = new ProductController()

router.get('/',        getProducts)
router.get('/:pid',    getProduct)
router.post('/',       authorization('admin'), createProduct)
router.put('/:pid',    authorization('admin'), updateProduct)
router.delete('/:pid', authorization('admin'), deleteProduct)

export default router