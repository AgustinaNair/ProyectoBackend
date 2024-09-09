import { model, Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    category: String,
    createBy: {type: Schema.Types.ObjectId, ref: 'users'}
})

productsSchema.plugin(mongoosePaginate)

const productsModel = model('products', productsSchema)
export default productsModel