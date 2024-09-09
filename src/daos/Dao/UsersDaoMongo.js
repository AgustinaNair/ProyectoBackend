import { userModel } from "../models/user.model.js";
export class UsersDaoMongo {
    constructor() {
      this.userModel = userModel;
    }

    async getUsers() {
        const users =  await this.userModel.find().select('first_name email role last_connection')
        return users
    }
  
    async createUser(newUser) {
      console.log('dao')
        return await this.userModel.create(newUser)
    }
  
    async getUserBy (filter) {
      return await this.userModel.findOne(filter);
    }
  
    async getUserByEmail(email) {
      return  this.users.find((user) => user.email === email);
    // aca el this.users esta bien?
    }  

    async cambiaRole (uid, role) {
      const result = await this.userModel.updateOne({_id: uid}, {$set: {role: role}})
    }
    async ultimaConexion(email, fecha) {
      try{
        const result = await this.userModel.updateOne({email: email}, {$set: {last_connection: fecha}})
        return result
      }catch(error){
        console.log(error)
      }
    }
    deleteUser = async(uid) =>{ 
      try{
          const users = await this.userModel.findByIdAndDelete(uid)
          return users;
      } catch (error) {
          logger.error(error);
      }
  }
    // async uploadDocuments('eldocumento') {
    //   codigo con multer para poner guardar los documentos que mle pase
    // }
    // async updatePremium{
    //   // Identificación, Comprobante de domicilio, Comprobante de estado de cuenta
    //   // comprueba que se haya subido todo para hacer al usuario premium 
    //   try{
    //     // const result = await this.userModel.updateOne({__id: uid}, {$set: {role: premium}}) 
    //     return result
    //   }catch(error){
    //     console.log(error)
    //   }
    // }
  }