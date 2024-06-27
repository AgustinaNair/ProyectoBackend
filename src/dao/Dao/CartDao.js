import fs from 'fs'

class CartDao {
    static id = 1
    
    constructor(path) {
        this.path = path;

    }


    getCart = async (limit) => {
        try{
            const cartJson = await fs.promises.readFile(this.path, 'utf-8')
            let carts = JSON.parse(cartJson)
            if (limit){
                return carts.slice(0, parseInt(limit))
            
            }
            return carts
        }catch(error){
            console.log(error)
            return []
        }
    }
    addCart = async cart => {

        if (!cart.products){
            throw new Error("Faltan parámetros")     
        } 
        try{
            const carts = await this.getCart()
            if (carts.length === 0){
                cart.id = 1
            }else{
                cart.id = carts.length +1
            }
            carts.push({
                ...cart,
                products: cart.products
            })
            console.log(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8')
            
             return cart

        }catch (error) {
            cart.id = cart.length
            console.log(error)
        }    

            
    }

    getCartById = async id => {
        try{
            const carts = await this.getCart()
            const cartId = await carts.find(cart => cart.id === parseFloat(id))
            if (cartId) {
                return cartId
            } else {
                return ('Not fount')
            }
        }catch(error){
            console.log(error)
        }
    }

    updateCart = async(cid, pid, quantity = 1) =>{

        try {
            const carts = await this.getCart();
            const cartIndex = carts.findIndex(cart => cart.id === parseFloat(cid) );
            if (cartIndex !== -1) {
                const productIndex = carts[cartIndex].products.findIndex(product => product.id === pid);
                console.log(productIndex)
                if (productIndex !== -1) {
                    carts[cartIndex].products[productIndex].quantity += quantity;
                } else {
                   carts[cartIndex].products.push({ id: pid, quantity });
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8');
                return carts[cartIndex];
            } else {
                return 'Carrito no encontrado';
            }
        } catch (error) {
            console.log(error);
        }
    }
}





export default CartDao