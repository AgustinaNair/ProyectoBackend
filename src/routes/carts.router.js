import { Router } from "express";
import CartManager from "../dao/Dao/CartManager.js";
import cartsModel from "../dao/models/carts.model.js";
import updateCart from "../dao/Dao/CartMongo.Manager.js";
const router = Router()

// const {addCart, getCartById, updateCart} = new CartManager('./carts.json')

router.get('/:cid', async(req, res) => {
    const {cid} = req.params
    const result = await cartsModel.findOne({_id: cid})

    // persistencia en archivos
    // const result = await getCartById(cid)
    res.send({status:'success', payload: result})
})

router.post('/', async(req, res) => {
    const result = await cartsModel.create({products:[]})
    // persistencia en archivos
    // const result = await addCart({products:[]})
    
    res.send({status: 'seccess', payload: result})
})
router.post('/:cid/product/:pid', async(req,res)=>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await updateCart(cid, pid, quantity);
    // persistencia en archicos
    // const result = await updateCart(cid, pid, quantity)
    res.send({status:'success', payload: result})
})
export default router