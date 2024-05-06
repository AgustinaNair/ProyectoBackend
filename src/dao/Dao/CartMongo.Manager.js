import cartsModel from "../models/carts.model.js";

const updateCart = async (cartId, productId, quantity) => {
    try {

        let cart = await cartsModel.findById(cartId);

        if (!cart) {
            console.log('el carrito no existe')
        }

        const productIndex = cart.products.findIndex(product => product.productId === productId);

        if (productIndex === -1) {
           
            cart.products.push({ productId, quantity });
            
        } else {
            cart.products[productIndex].quantity += quantity;
            
        }

        await cart.save();
        await cartsModel.updateOne({_id: cartId}, {$set: cart})
        console.log('carrito actualizado')
        return cart;
    } catch (error) {
        
        console.error("Error updating cart:", error);
        return { error: "Error updating cart" };
    }
};
export default updateCart