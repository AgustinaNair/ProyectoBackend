import { model, Schema } from "mongoose";

const messagesSchema = new Schema({
    email: String,
    message: String
})
const messagesModel = model('messages', messagesSchema)

export default messagesModel