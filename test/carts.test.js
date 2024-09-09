// import CartDaoManager from "../src/daos/Dao/CartMongo.Dao.js";
import mongoose from "mongoose";
import Asserts from "assert";
import { cartService } from "../src/service/index.js";

mongoose.connect('mongodb+srv://agustinadesinano:quebuenacontraseña@cluster0.b2cdbfu.mongodb.net/ecommercee')

const assert = Asserts.strict

describe('Test product dao', () =>{
    before(async function(){
        this.cartDao = cartService
    })
    beforeEach (function(){
        this.timeout(5000)
    })
    it('El dao debe obtener un cart por id', async function(){
        const id= '663d08c69f705cc63996f3c7'
        const cart = await this.cartDao.getCartById(id)
        assert.strictEqual(typeof cart, 'object')
    })
    it('El dao debe agregar un carrito correctamente a la base de datos', async function(){
        
        const result = await this.cartDao.addCart()
    
        assert.ok(result._id)
    })
})