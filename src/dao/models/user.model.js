import { Schema, model }  from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    age: Number,
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: String,
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user'
    }
})
// odm 

userSchema.plugin(mongoosePaginate)

export const userModel = model(userCollection, userSchema)