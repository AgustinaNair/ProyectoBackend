import { userModel } from "../models/user.model.js";

export class UsersDaoMongo {
    constructor() {
      this.userModel = userModel;
    }

    async getUsers({limit = 10, numPage=1}) {
        // const users =  await this.userModel.find().lean()
        const users =  await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users
    }
  
    async createUser(newUser) {
        return await this.userModel.create(newUser)
    }
  
    async getUserBy (filter) {
      return await this.userModel.findOne(filter);
    }
  
    async getUserByEmail(email) {
      return  this.users.find((user) => user.email === email);
    }  
  
  }