import CartMongoDao from "../daos/Dao/CartMongo.Dao.js";
import ProductMongoDao from "../daos/Dao/ProductMongo.Dao.js";
import { UsersDaoMongo } from "../daos/Dao/UsersDaoMongo.js";
import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/carts.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";
import { TicketDao } from "../daos/Dao/TicketMongo.Dao.js";

export const userService = new UserRepository(new UsersDaoMongo())
export const productService  = new ProductRepository(new ProductMongoDao())
export const cartService = new CartRepository(new CartMongoDao()) 
export const ticketService = new TicketRepository(new TicketDao())

