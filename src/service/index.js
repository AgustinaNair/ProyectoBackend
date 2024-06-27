import CartMongoDao from "../dao/Dao/CartMongo.Dao.js";
import ProductMongoDao from "../dao/Dao/ProductMongo.Dao.js";
import { UsersDaoMongo } from "../dao/Dao/UsersDaoMongo.js";


export const userService = new UsersDaoMongo()
export const productService  = new ProductMongoDao()
export const cartService = new CartMongoDao()
