import {ticketService, cartService, userService} from "../service/index.js"

class TicketController{
    constructor() {
        this.ticketService = ticketService;
        this.cartService = cartService;
        this.userService = userService;
    }
    getTicket = async (req, res) => {
        const { tid } = req.params;
        const ticketFound = await ticketService.getTicket({ _id: tid });
        try {
            if (!ticketFound) return res.status(400).send({ status: 'error', error: `¡ERROR! No existe el ticket con el id ${tid}` });
            res.status(200).send({ status: 'success', payload: ticketFound });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.message });
        }
    };
}
