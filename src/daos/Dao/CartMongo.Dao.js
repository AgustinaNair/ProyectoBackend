import mongoose from "mongoose";
import cartsModel from "../models/carts.model.js";
import fs from 'fs'
import { productService, ticketService } from "../../service/index.js";
import { CustomError } from "../../service/errors/CustomError.js";
import { generateCartError } from "../../service/errors/info.js";
import { logger } from "../../utils/logger.js";
import { sendEmail } from "../../utils/sendMail.js";




class CartDaoManager {
    
    constructor(path) {
        this.path = path;

    }

    getCartById = async (cid) => {
        try{
            const cart = await cartsModel.findOne({_id: cid}).lean()

            return cart
        }catch(error){
            logger.error(error)
            return []
        }
    }
    addCart = async() => {
        try{
            const cart = await cartsModel.create({products:[]})
            return cart
        }catch (error) {
            logger.error(error)
        }                
    }
    addProduct = async(cid, pid, quantity) =>{
        try{
            let cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('El carrito no existe')
            }    
            
            const productId = new mongoose.Types.ObjectId(pid)
            const productIndex = cart.products.findIndex(item => item.product.equals(productId));
            
            if (productIndex === -1) {
                cart.products.push({ "product": productId, quantity });
                
            } else {
                cart.products[productIndex].quantity += quantity;
            }
            
            await cart.save();
            await cartsModel.updateOne({_id: cid}, {$set: cart})
            logger.info('carrito actualizado')
            return cart;
        }catch (error) {
            logger.error(error)
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
            this.deleteTodosLosProduct(cid)
            cart.products= []
            products.forEach(({ product, quantity }) => {
                const productId = new mongoose.Types.ObjectId(product)
                logger.info(productId)
                // const productIndex = cart.products.findIndex(item => item.product.equals(productId));
    
                // if (productIndex === -1) {
                    cart.products.push({ "product": productId, quantity });
                
                // } else {
                //     cart.products[productIndex].quantity = quantity;
                // }
            });

            await cart.save();
            await cartsModel.updateOne({_id: cid}, {$set: cart})
            logger.info('carrito actualizado')
            return cart;

        } catch (error) {
            logger.error("Error updating cart:", error);
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
            logger.error(error);
        }
    }
    deleteTodosLosProduct = async(cartId) =>{
        const result = await cartsModel.updateOne({_id: cartId}, {$set: {products: []}}, {new:true})
        return result
    }
    buyCart = async(cid, email) =>{
        try {
            let cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('El carrito no existe')
            }   
            console.log('carrito:'+ cid)
            console.log('email:'+ email)
            let newCart = []
            let carritoComprado = []
            let precioTotal = 0
            cart.products.forEach((item) => {
                if (item.product.stock < item.quantity){
                    logger.info('no hay stock sufuciente del producto:' + item.product._id)
                    newCart.push(item)

                } else if(item.product.stock > item.quantity){
                    carritoComprado.push(item)
                    item.product.stock -= item.quantity
                    let productoAActualizar = {
                        title:item.product.title,
                        description:item.product.description,
                        price:item.product.price, 
                        thumbnail:item.product.thumbnail, 
                        code:item.product.code, 
                        stock:item.product.stock, 
                        category:item.product.category
                    }
                    productService.updateProduct(item.product._id, productoAActualizar)               
                    logger.info('Se compro y se ha actualizado el stock del producto:' + item.product._id)
                    precioTotal += item.product.price * item.quantity
                }else if (item.product.stock = item.quantity){
                    logger.info('Se compro el producto:' + item.product._id)
                    carritoComprado.push(item)
                    precioTotal += item.product.price * item.quantity
                }

            });
            logger.info('El carrito quedo asi:' + newCart)
            if (precioTotal === 0){
                console.log('No tienes productos o no hay stock de lo elegido')
                await sendEmail({
                    email,
                    subject: 'Compra no realizada',
                    html: `
                    <div>
                        <h1>No hay stock de los productos elegidos</h1>
                    </div>
                    `
                })
                
            } else{
                await this.updateTodoCart(cid, newCart)
                const ticketlisto = await ticketService.createTicket({
                    amount: precioTotal,
                    purchaser: email
                })
                const opciones = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short'
                };
                const fechaLegible = ticketlisto.purchase_datetime.toLocaleDateString('es-ES', opciones)
                
                await sendEmail({
                    email,
                    subject: 'Compra realizada',
                    html: `
                    <div>
                        <h1>Genial, acabas de realizar una compra </h1>
                        <p>Fecha de compra: ${fechaLegible}
                        Monto total: ${ticketlisto.amount}</p>
                    </div>
                    `
                }) 
            }
            
            return carritoComprado;

        } catch (error) {
            logger.error(error)
        }
    }
}

export default CartDaoManager




















// -----------------
const updateCart = async (cartId, productId, quantity) => {
    
};
// export default updateCart