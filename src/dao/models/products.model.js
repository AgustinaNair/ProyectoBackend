import { model, Schema } from "mongoose";

const productsSchema = new Schema({
    title: String,
    description: String,
    price: String,
    code: String,
    stock: String,
    category: String,
    id: Number
})
const productsModel = model('products', productsSchema)

export default productsModel