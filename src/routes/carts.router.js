import { Router } from "express";

const router = Router()
//metodos del crud de carts
router.get('/', (req, res)=> {
    res.send('get de carts')
})
export default router