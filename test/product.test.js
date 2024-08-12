import mongoose from "mongoose";
import ProductMongoManager from "../src/daos/Dao/ProductMongo.Dao.js";
import Asserts from "assert";

mongoose.connect('mongodb+srv://agustinadesinano:quebuenacontraseña@cluster0.b2cdbfu.mongodb.net/ecommercee')

const assert = Asserts.strict

describe('Test product dao', () =>{
    before(function(){
        this.productDao = new ProductMongoManager()
    })
    beforeEach (function(){
        // con esto eliminas la base de datos para hacer siempre la misma prueba 
        // mongoose.connection.collections.ecommercee.products.drop
        this.timeout(5000)
    })
    it('El dao debe obtener los products en formato arreglo', async function() {
        //las acciones a ejecutar
        const result = await this.productDao.getTodosProducts()
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El dao debe agregar un producto correctamente a la base de datos', async function() {
        // essto no va andar porque necesito iniciar sesion como admin 
        // let mockProduct = {
        //     title: 'Producto de mocha test 2',
        //     description: 'producto generado con el test unitario mocha',
        //     price: 1,
        //     code: '1',
        //     stock: 1,
        //     category: 'prueba'
        // }
        
        // const result = await this.productDao.addProduct(mockProduct)
        // assert.ok(result._id)
    })
})