import fs from 'fs'

const path = './data.txt'
class ProductManager {
    static id = 1
    
    constructor(path) {
        this.path = path;

    }

    getProduct = async (limit) => {
        try{
            const productsJson = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(productsJson)
            if (limit){
                return products.slice(0, parseInt(limit))
            
            }
            return products
        }catch(error){
            console.log(error)
            return []
        }
    }
        
    addProduct = async product => {

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            throw new Error("Faltan parámetros")     
        } 
        try{
            const products = await this.getProduct()
            if (products.length === 0){
                product.id = 1
            }else{
                product.id = products.length +1
            }
            products.push(product)
            console.log(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8')
            
             return product

        }catch (error) {
            product.id = product.length
            console.log(error)
        }

        
    }

    


    getProductById = async id => {
        try{
            const products = await this.getProduct()
            const productId = await products.find(product => product.id === parseInt(id))
            if (productId) {
                return productId
            } else {
                return ('Not fount')
            }
        }catch(error){
            console.log(error)
        }


    }
    updateProduct = async(id, update) =>{
        try{
            const products = await this.getProduct()
            const productUpdate = products.findIndex(producto => producto.id === id);
            if (productUpdate !== -1) {
                products[productUpdate].title = update.title;
                products[productUpdate].description = update.description;
                products[productUpdate].price = update.price; 
                products[productUpdate].thumbnail = update.thumbnail;
                products[productUpdate].code = update.code;
                products[productUpdate].stock = update.stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8');
                return products;
            } else {
                return 'Producto no encontrado';
            }
        }catch(error){
            console.log(error)
        }
    }
    deleteProduct = async(id) =>{ 
        try{
            const products = await this.getProduct()
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products.splice(productIndex, 1); 
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8'); 
                return products;
            } else {
                return 'Producto no encontrado';
            }
        } catch (error) {
            console.log(error);
        }
    }
}





export default ProductManager