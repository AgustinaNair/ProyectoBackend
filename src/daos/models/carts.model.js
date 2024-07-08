import { model, Schema } from "mongoose";

const cartsSchema = new Schema({
    // userId:String
    products: {
        type:[{
            product:{
                type: Schema.Types.ObjectId,
                ref:'products'
            },
            quantity: Number
        }]
    }
})
cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})
// cartsSchema.pre('find', function(){
//     this.populate('products.product')
// })

const cartsModel = model('carts', cartsSchema)

export default cartsModel