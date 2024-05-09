import productsModel from "../models/products.model.js";

import fs from 'fs'
// const socket = io()

class ProductMongoManager {
    
    constructor(path) {
        this.path = path;

    }

    getProduct = async ({limit = 10 , numPage = 1, sort = 1, query = null}) => {
        try{
            const products = await productsModel.paginate({query}, {limit, page: numPage, lean: true, sort:{price: sort}})
            return products
        }catch(error){
            console.log(error)
            return []
        }
    }
        
    addProduct = async product => {

        if (!product.title || !product.description || !product.price || !product.code || !product.stock){
            throw new Error("Faltan parámetros")     
        } 
        try{
            const addProduct = await productsModel.create(product)
            //  io.emit("server:newnote", product);
             return product
        }catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }

    updateProduct = async(pid, {title, description, price, thumbnail, code, stock, category}) =>{
        try{
            const result = await productsModel.updateOne({_id: pid}, {$set: {title, description, price, thumbnail, code, stock, category}})
            return result
        }catch(error){
            console.log(error)
        }
    }

    deleteProduct = async(pid) =>{ 
        try{
            const products = await productsModel.findByIdAndDelete(pid)
            return products;
        } catch (error) {
            console.log(error);
        }
    }

}




export default ProductMongoManager