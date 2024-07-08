import { productService } from "../service/index.js"

class ProductController {
    constructor(){
        this.service = productService
    }

    getProducts   = async(req, res) => {
        try {
            const products = await this.service.getTodosProducts()
            res.send({status:'success', payload:products})
        } catch (error) {
            console.log(error)
        }
        
    }

    getProduct   = async(req, res) => {
        try {
            const {pid} = req.params
            const result = await this.service.getProductById(pid)
            res.send({status:'success', payload: result}) 
        } catch (error) {
            console.log(error)
        }
    }

    createProduct = async(req, res) => {
        try {
            const {title, description, price, thumbnail, code, stock, category} = req.body
            if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
            const result = await this.service.addProduct(req.body)
            // req.io.emit('producto-agregado', result)
            res.send({status: 'success', payload: result})   
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async(req,res)=>{
        try {
        const {pid} = req.params
        const {title, description, price, thumbnail, code, stock, category} = req.body
        if(!title || !description || !price || !code || !stock || !category) return res.send({status: 'error', error: 'faltan datos'})
        
        const result = await this.service.updateProduct(pid, {title, description, price, thumbnail, code, stock, category})
        // req.io.emit('producto-actualizado', result)
        res.send({status:'success', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async(req,res) =>{
        try {
        const {pid} = req.params
        const result = await this.service.deleteProduct(pid)
        // req.io.emit('producto-eliminado', result)
        res.send({status:'success', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductController