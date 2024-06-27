import { Router } from "express";
import CartController from "../../controllers/carts.controller.js";

const router = Router()
const {getCart, createCart, addProductCart, updateCart, updateProductCart, deleteProductCart, deleteCart} = new CartController

router.get('/:cid', getCart)
router.post('/', createCart)
router.post('/:cid/product/:pid', addProductCart)
router.put('/:cid', updateCart)
router.put('/:cid/product/:pid', updateProductCart)
router.delete('/:cid/product/:pid', deleteProductCart)
router.delete('/:cid/', deleteCart)

export default router