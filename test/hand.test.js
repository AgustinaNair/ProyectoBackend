import * as chai from 'chai'
import UserCurrentDto from '../src/dtos/usersCurrent.dto.js'
import { createHash, isValidPassword} from '../src/utils/bcrypt.js'

const expect = chai.expect

describe('Testing bcript', () =>{
    it('El servicio debe devolver un hasheo efectivo del password', async () =>{
        const password = '123456'
        const hashpassword = await createHash(password)
        expect(hashpassword).to.not.equal(password)
    })
    it('El hasheo realizado debe poder compararse de manera efectiva con el pass original', async()=>{
        const password = '123456'
        const hashpassword = await createHash(password)
        const isValidPass = await isValidPassword({password: hashpassword}, password)

        expect(isValidPass).to.be.ok
    })
})