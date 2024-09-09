import * as chai from 'chai'
import mongoose from 'mongoose'
import { productService } from "../src/service/index.js";

const expect = chai.expect
mongoose.connect('mongodb+srv://agustinadesinano:quebuenacontraseña@cluster0.b2cdbfu.mongodb.net/ecommercee')

describe('Set de test con chai', ()=>{
    before(function(){
        this.productDao  = productService
    })
    beforeEach (function(){
        this.timeout(5000)
    })
    it('El dao debe obtener los products en formato arreglo', async function() {
        const result = await this.productDao.getProducts()
        expect(Array.isArray(result)).to.be.ok
    })
})