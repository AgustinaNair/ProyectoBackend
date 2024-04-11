import { Router } from "express";
import CartManager from "../manages/CartManager.js";

const router = Router()

const {addCart, getCartById, updateCart} = new CartManager('./carts.json')

router.get('/:cid', async(req, res) => {
    const {cid} = req.params
    const result = await getCartById(cid)
    res.send({status:'success', payload: result})
})

router.post('/', async(req, res) => {
    
    const result = await addCart({products:[]})
    
    res.send({status: 'seccess', payload: result})
})
router.post('/:cid/product/:pid', async(req,res)=>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await updateCart(cid, pid, quantity)
    res.send({status:'success', payload: result})
})
export default router