import mongoose from "mongoose";
import cartsModel from "../models/carts.model.js";
import fs from 'fs'
import { ticketModel } from "../models/tickets.model.js";



class CartDaoManager {
    
    constructor(path) {
        this.path = path;

    }

    getCartById = async (cid) => {
        try{
            const carts = await cartsModel.findOne({_id: cid}).lean()

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
            let cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('El carrito no existe')
            }    
            
            const productId = new mongoose.Types.ObjectId(pid)
            console.log(productId)
            const productIndex = cart.products.findIndex(item => item.product.equals(productId));
            
            if (productIndex === -1) {
                cart.products.push({ "product": productId, quantity });
                
            } else {
                cart.products[productIndex].quantity += quantity;
            }
            
            await cart.save();
            await cartsModel.updateOne({_id: cid}, {$set: cart})
            console.log('carrito actualizado')
            return cart;
        }catch (error) {
            console.log(error)
        }  


    }
    updateCart = async(cartId, product, quantity = 1) =>{
        // try {
        //     let cart = await cartsModel.findById(cartId);
        //     if (!cart) {
        //         throw new Error('El carrito no existe')
        //     }    
        //     const productId = new mongoose.Types.ObjectId(product)
        //     console.log(productId)
        //     const productIndex = cart.products.findIndex(item => item.product.equals(productId));
            
        //     if (productIndex === -1) {
        //         cart.products.push({ "product": productId, quantity });
                
        //     } else {
        //         cart.products[productIndex].quantity += quantity;
        //     }

        //     await cart.save();
        //     await cartsModel.updateOne({_id: cartId}, {$set: cart})
        //     console.log('carrito actualizado')
        //     return cart;

        // } catch (error) {
        //     console.error("Error updating cart:", error);
        //     return { error: "Error updating cart" };
        // }

        const result = await cartsModel.findOneAndUpdate(
            {_id: cartId, 'products.product': product},
            {$inc: {'products.$.quantity': quantity}},
            {new: true}
        )
        if(result) return result
        const newProductInCart = await cartsModel.findOneAndUpdate(
            {_id: cartId},
            { $push: {products:{product: product, quantity: quantity}}},
            {new: true}
        )
        return newProductInCart
    }
    updateTodoCart = async(cid, products) =>{
        try {
            let cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('El carrito no existe')
            }    
            products.forEach(({ product, quantity }) => {
                const productId = new mongoose.Types.ObjectId(product)
                console.log(productId)
                const productIndex = cart.products.findIndex(item => item.product.equals(productId));
    
                if (productIndex === -1) {
                    cart.products.push({ "product": productId, quantity });
                
                } else {
                    cart.products[productIndex].quantity += quantity;
                }
            });

            await cart.save();
            await cartsModel.updateOne({_id: cid}, {$set: cart})
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
                { $pull: { products: { productId: productId } } },
                {new:true}
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    deleteTodosLosProduct = async(cartId) =>{
        const result = await cartsModel.updateOne({_id: cartId}, {$set: {products: []}}, {new:true})
        return result
    }
    buyCart = async(ticket) =>{
        try {
            const result = await ticketModel.create(ticket)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartDaoManager




















// -----------------
const updateCart = async (cartId, productId, quantity) => {
    
};
// export default updateCart