export default class UserRepository{
    constructor(UsersDaoMongo){
        this.userDao = UsersDaoMongo
    }
    getUsers       = async() => await this.userDao.getUsers()
    createUser     = async (user) => await this.userDao.createUser(user)
    getUser        = async filter => await this.userDao.getUserBy(filter)
    getUserByEmail = async email => await this.userDao.getUserByEmail(email)
    conexionUser   = async (email, fecha) =>await this.userDao.ultimaConexion(email, fecha)
    deleteUser     = async(uid) => await this.userDao.deleteUser(uid)
    cambiaRole     = async(uid, role) => await this.userDao.cambiaRole(uid, role)
}