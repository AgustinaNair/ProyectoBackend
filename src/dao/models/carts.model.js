import { model, Schema } from "mongoose";

const cartsSchema = new Schema({
    products: Object
})
const cartsModel = model('carts', cartsSchema)

export default cartsModel