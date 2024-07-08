import { createHash, isValidPassword} from '../utils/bcrypt.js'
import passport from 'passport'
import { Strategy, ExtractJwt} from 'passport-jwt'
import local from 'passport-local'
import GithubStratetegy from 'passport-github2'
import { UsersDaoMongo } from '../daos/Dao/UsersDaoMongo.js'


const userService = new UsersDaoMongo()
const LocalStrategy = local.Strategy

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies) token = req.cookies['token']
    return token
}

export const initializePassport = () => {
    passport.use ('jwt', new Strategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (err) {
            return done(err)
        }
    }))
}

// para usar con gitbub y local
// export const initializePassport = () => {
//     // middleware -> estrategia -> local -> username(email), password
//    passport.use('github', new GithubStratetegy({
//     clientID:'Iv23lizsiNYTSTKSYrrF',
//     clientSecret:'18c9a657ce4a55f57e335d22410e502f1b86eb97',
//     callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
//    }, async (accesToken, refreshToken, profile, done)=>{
//     try {
//         console.log(profile)
//         let user  = await userService.getUserBy({email: profile._json.email})
//         // no existe el usuario en nuestra base de datos
//         if(!user){
//             let newUser = {
//                 first_name: profile._json.name,
//                 last_name: profile._json.name,
//                 email: profile._json.email,
//                 password: ''
//             }
//             let result = await userService.createUser(newUser) 
//             done(null, result)
//         }else{
//             done(null, user)
//         }

//     } catch (err) {
//         return done(err)
//     }
//    }) )

   
//    passport.use('register', new LocalStrategy({
//     passReqToCallback: true, 
//     usernameField: 'email'
// }, async( req, username, password, done ) => {
//       const { first_name, last_name } = req.body
//         try {
//             let userFound = await userService.getUserBy({email: username})
//             if(userFound) {
//                 console.log('el usuario ya existe')
//                 return done(null, false)
//             }
//             // crear el uusario 
//             let newUser = {
//                 first_name,
//                 last_name,
//                 email: username,
//                 password: createHash(password)
//             }
//             let result = await userService.createUser(newUser) // _id
//             return done(null, result)
//         } catch (error) {
//             return done('error al registrar el usuario '+error)   
//         }
// }))


// passport.use('login', new LocalStrategy({
//     usernameField: 'email'
// }, async(username, password, done)=>{
//     try {
//         const user = await userService.getUserBy({email: username})
//         if(!user) {
//             console.log('usuario no encontrado')
//             return done(null, false)
//         }
//         if(!isValidPassword(password, {password: user.password})) return done(null, false)
//         return done(null, user) // req.user // password 
//     } catch (error) {
//         return done(error)
//     }
// }))


//     passport.serializeUser((user, done) => {
//         done(null, user._id)
//     })
//     passport.deserializeUser(async(id, done) => {
//         try {
//             let user = await userService.getUserBy({_id:id})
//             done(null, user)
//         } catch (error) {
//             done(error)
//         }
//     })
// }