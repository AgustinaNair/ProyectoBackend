import { logger } from "../../utils/logger.js";
import {ticketModel} from "../models/tickets.model.js"
export class TicketDao{
    constructor(path){
        this.path = path;
    }
    createTicket = async (ticket) => {
        try{
            return await ticketModel.create(ticket)
        }catch(error){
            logger.error(error)
            return []
        }
    }
}