import CartMongoDao from "../daos/Dao/CartMongo.Dao.js";
import ProductMongoDao from "../daos/Dao/ProductMongo.Dao.js";
import { UsersDaoMongo } from "../daos/Dao/UsersDaoMongo.js";


export const userService = new UsersDaoMongo()
export const productService  = new ProductMongoDao()
export const cartService = new CartMongoDao()
