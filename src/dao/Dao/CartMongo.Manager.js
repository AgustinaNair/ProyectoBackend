import cartsModel from "../models/carts.model.js";
import fs from 'fs'

class CartMongoManager {
    
    constructor(path) {
        this.path = path;

    }

    getCartById = async (cid) => {
        try{
            const carts = await cartsModel.findOne({_id: cid})
            return carts
        }catch(error){
            console.log(error)
            return []
        }
    }
    addCart = async() => {
        try{
            const cart = await cartsModel.create({products:[]})
            return cart
        }catch (error) {
            console.log(error)
        }                
    }
    addProduct = async(cid, pid, quantity) =>{
        try{
            const cart = await cartsModel.findOne({_id: cid})
            cart.products.push({product: pid, quantity})
            const respuesta = await cartsModel.findByIdAndUpdate({_id:cid}, cart)
            return cart
        }catch (error) {
            console.log(error)
        }  
    }
    updateCart = async(cartId, productId, quantity = 1) =>{
        try {
            let cart = await cartsModel.findById(cartId);
            if (!cart) {
                console.log('el carrito no existe')
            }    
            const productIndex = cart.products.findIndex(product => product.productId === productId);    
            if (productIndex === -1) {
                cart.products.push({ productId, quantity });
            } else {
                cart.products[productIndex].quantity = quantity;
            }
            await cart.save();
            await cartsModel.updateOne({_id: cartId}, {$set: cart})
            console.log('carrito actualizado')
            return cart;

        } catch (error) {
            console.error("Error updating cart:", error);
            return { error: "Error updating cart" };
        }
    }
    deleteproduct = async(cartId, productId) => {
        try {
            const result = await cartsModel.updateOne(
                { _id: cartId },
                { $pull: { products: { productId: productId } } }
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    deleteTodosLosProduct = async(cartId) =>{
        const result = await cartsModel.updateOne({_id: cartId}, {$set: {products: []}})
        return result
    }
}

export default CartMongoManager




















// -----------------
const updateCart = async (cartId, productId, quantity) => {
    
};
// export default updateCart