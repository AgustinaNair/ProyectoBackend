import { CustomError } from "../service/errors/CustomError.js"
import { EError } from "../service/errors/enums.js"
import { generateProductError } from "../service/errors/info.js"
import { productService, userService } from "../service/index.js"
import { logger } from "../utils/logger.js"
import { decodificaToken } from "../config/index.js"
import { sendEmail } from "../utils/sendMail.js"
class ProductController {
    constructor(){
        this.service = productService
        this.userService = userService
    }

    getProducts   = async(req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({status:'success', payload:products})
        } catch (error) {
            logger.error(error)
        }
        
    }

    getProduct   = async(req, res) => {
        try {
            const {pid} = req.params
            const result = await this.service.getProductById(pid)
            res.send({status:'success', payload: result}) 
        } catch (error) {
            logger.error(error)
        }
    }

    createProduct = async(req, res, next) => {
        try {
            const {title, description, price, thumbnail, code, stock, category} = req.body
            // if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
            if(!title || !description || !price || !code || !stock || !category) {
                CustomError.createError({
                    name: 'Error al crear un producto',
                    cause: generateProductError( {title, description, price, code, stock, category}),
                    message: 'Faltan datos para crear el producto',
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const token = req.cookies.token
            const user = decodificaToken(token)
            const userRole = user && user.role ? user.role : ''
            const userId = user && user.id ? user.id : ''
            if(userRole === 'premium'){
                const result = await this.service.createProduct(req.body, userId)
                res.send({status: 'success', payload: result})
            }else{
                const result = await this.service.createProduct(req.body)
                res.send({status: 'success', payload: result})
            }
            // req.io.emit('producto-agregado', result)
        } catch (error) {
            next(error)
        }
    }

    updateProduct = async(req, res, next)=>{
        try {
        const {pid} = req.params
        const {title, description, price, thumbnail, code, stock, category} = req.body
        if(!title || !description || !price || !code || !stock || !category) {
            CustomError.createError({
                name: 'Error al actualizar un producto',
                cause: generateProductError( {title, description, price, code, stock, category}),
                message: 'Faltan datos para actualizar el producto',
                code: EError.INVALID_TYPES_ERROR
            })
        }
        const result = await this.service.updateProduct(pid, {title, description, price, thumbnail, code, stock, category})
        // req.io.emit('producto-actualizado', result)
        res.send({status:'success', payload: result})            
        } catch (error) {
            next(error)
        }
    }

    deleteProduct = async(req,res) =>{
        try {
        const {pid} = req.params
        const product = await this.service.getProductById(pid)
        if (product.createBy){
            const userCreador = await this.userService.getUser(product.createBy)
            sendEmail({
                email: userCreador.email,
                subject: 'Producto eliminado',
                html: `Hola ${userCreador.first_name} lamento informarle que su producto "${product.title}" a sido eliminado`
            })
        }
        const result = await this.service.deleteProduct(pid)
        // req.io.emit('producto-eliminado', result)
        res.send({status:'success', payload: result})            
        } catch (error) {
            logger.error(error)
        }
    }
}

export default ProductController