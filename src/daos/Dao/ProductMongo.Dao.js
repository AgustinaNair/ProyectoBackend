import { logger } from "../../utils/logger.js";
import productsModel from "../models/products.model.js";

import fs from 'fs'
// const socket = io()

class ProductMongoManager {
    
    constructor(path) {
        this.path = path;

    }
    getTodosProducts = async () => {
        try{
            const products = await productsModel.find()
            return products
        }catch(error){
            logger.error(error)
            return []
        }
    }

    getProduct = async ({limit = 2 , numPage = 1, sort = 1, query = null}) => {
        try{
            const products = await productsModel.paginate({query}, {limit, page: numPage, lean: true, sort:{price: sort}})

            return products
        }catch(error){
            logger.error(error)
            return []
        }
    }
        
    addProduct = async (product, user) => {

        if (!product.title || !product.description || !product.price || !product.code || !product.stock){
            throw new Error("Faltan parámetros")     
        } 
        try{
            if (!mongoose.Types.ObjectId.isValid(user)) {
                console.log("ID de usuario no es válido: " + user);
            }
            const userId = mongoose.Types.ObjectId(user);
            console.log(userId)
            const addProduct = await productsModel.create({
                title: product.title,
                description: product.description,
                price: product.price,
                code: product.code,
                stock: product.stock,
                category: product.category,
                createBy: userId
            })
            //  io.emit("server:newnote", product);
             return product
        }catch (error) {
            logger.error(error)
        }
        
    }

    getProductById = async pid => {
        try{
            const productId = await productsModel.findOne({_id: pid})
            if (productId) {
                return productId
            } else {
                return ('Not fount')
            }
        }catch(error){
            logger.error(error)
        }
    }

    updateProduct = async(pid, {title, description, price, thumbnail, code, stock, category}) =>{
        try{
            const result = await productsModel.updateOne({_id: pid}, {$set: {title, description, price, thumbnail, code, stock, category}})
            return result
        }catch(error){
            logger.error(error)
        }
    }

    deleteProduct = async(pid) =>{ 
        try{
            const products = await productsModel.findByIdAndDelete(pid)
            return products;
        } catch (error) {
            logger.error(error);
        }
    }

}




export default ProductMongoManager