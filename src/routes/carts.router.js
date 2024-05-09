import { Router } from "express";
import cartMongoManager from "../dao/Dao/CartMongo.Manager.js";
const router = Router()

const {addCart, getCartById, updateCart, deleteproduct, deleteTodosLosProduct, addProduct} = new cartMongoManager()

router.get('/:cid', async(req, res) => {
    const {cid} = req.params
    const result = await getCartById(cid)
    res.send({status:'success', payload: result})
})

router.post('/', async(req, res) => {
    const result = await addCart()
    res.send({status: 'seccess', payload: result})
})
router.post('/:cid/product/:pid', async(req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await addProduct(cid, pid, quantity);
    res.send({status: 'seccess', payload: result})
})
router.put('/:cid/product/:pid', async(req,res)=>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await updateCart(cid, pid, quantity);
    res.send({status:'success', payload: result})
})
router.delete('/:cid/product/:pid', async (req, res) =>{
    const { cid, pid } = req.params;
    const result = await deleteproduct(cid, pid);
    res.send({status:'success', payload: result})
})
router.delete('/:cid/', async (req, res) =>{
    const { cid } = req.params;
    const result = await deleteTodosLosProduct(cid);
    res.send({status:'success', payload: result})
})
export default router