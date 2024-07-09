import { Schema, model }  from "mongoose"
import { v4 as uuid } from "uuid";

const ticketsCollection = 'tickets'

const ticketsSchema = new Schema({
    code: {
        type: String,
        default:() => uuid().toString()
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    purchaser: String
})

export const ticketModel = model(ticketsCollection, ticketsSchema)