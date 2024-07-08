import {Router} from 'express'
import messagesModel from '../../daos/models/messages.models'

const router = Router()
router.get('/', async(req, res) => {

    const chats = await messagesModel.find({})
    res.send({status:'success', payload:chats})

})
router.post('/', async(req, res) => {

    const {email, message} = req.body
    if(!email || !message) return res.send({status: 'error', error: 'faltan datos'})
    const result = await messagesModel.create(req.body)
    res.send({status:'success', payload:result})

   
    // req.io.emit('menssage-agregado', result)
})
router.delete('/:mid', async(req,res) =>{
    const {mid} = req.params
    const result = await messagesModel.findByIdAndDelete(mid)

    // req.io.emit('mensaje-eliminado', result)
    res.send({status:'success', payload: result})
})
export default router