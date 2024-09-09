import { userService } from "../service/index.js"
import { logger } from "../utils/logger.js"
import { sendEmail } from "../utils/sendMail.js"

class UsersController {
    constructor(){
        this.service = userService
    }

    getUsers   = async(req, res) => {
        try {
            const users = await this.service.getUsers()
            
            res.send({status:'success', payload:users})
        } catch (error) {
            logger.error(error)
        }
    }

    uploadDocuments = async (req, res) => {
        try {
            const { uid } = req.params
            const files = req.files
            logger.info(files.length)
            if (!files) {
                return res.status(400).json({ 
                    status: 'error',
                    error: 'Faltan datos o archivos requeridos.' })
            }
        
            const user = await this.service.getUser({_id : uid})
            if (!user) {
              return res.status(404).json({ error: 'Usuario no encontrado.' })
            } 
            logger.info(user)
            console.log(files)
            user.documents = user.documents || []
        
            files.forEach((file) => {
              user.documents.push({
                name: file.filename,
                reference: file.destination, 
              })
            })
        
            let  result = await user.save()
        
            
            res.status(400).json({ 
                status: 'success', 
                payload: result
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error en el servidor.' })
        }
    }

    updatePremium = async(req, res) =>{
        try {
            // verifica que tenga todo para hacerse premium, debe obtenerr el id
            const result = await this.service.updatePremium('ponerlo aca al id')
            // req.io.emit('producto-agregado', result)
            res.send({status: 'success', payload: result})  
        } catch (error) {
            logger.error(error)
        }
    }
    updateRole = async(req, res) =>{
        try {
            // verifica que tenga todo para hacerse premium, debe obtenerr el id
            const { uid } = req.params
            const user = await this.service.getUser({_id : uid})
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado.' })
            } 
            if (user.role === 'user'){
                await this.service.cambiaRole( uid, 'admin')
            }else{
                await this.service.cambiaRole( uid, 'user')
            }
            
            
            req.io.emit('role-modificado', result)

            res.send({status: 'success', payload: user})  
        } catch (error) {
            logger.error(error)
        }
    }
    deleteUsers = async(req, res) =>{
        try {
            const users = await this.service.getUsers()
            const dosDiasEnMilliseconds = 2 * 24 * 60 * 60 * 1000
            const haceDosDías = Date.now() - dosDiasEnMilliseconds;

            const fechaHaceDosDias  = new Date(haceDosDías);
            if (!users) {
              return res.status(404).json({ error: 'Usuarios no encontrados.' })
            } 
            for (const user of users) {
                if (user.last_connection < haceDosDías) {
                    console.log('Eliminando a ' + user.first_name);
                    sendEmail({
                        email: user.email,
                        subject: 'Eliminando cuenta',
                        html: `Hola ${user.first_name} ${user.last_name} lamento imanformarle que su cuenta de ecommerce esta eliminada por inactividad`
                    })
                    await this.service.deleteUser(user._id); 
                    console.log('Usuario eliminado');
                }
            }
            res.send({status: 'success', payload: users})  
        } catch (error) {
            logger.error(error)
        }
    }
    deleteUser = async(req, res) =>{
        try {
            const { uid } = req.params
            const result = await this.service.deleteUser(uid); 
            res.send({status: 'success', payload: result})  
        } catch (error) {
            logger.error(error)
        }
    }
}

export default UsersController


// me dice esto TypeError: files.forEach is not a function
// at uploadDocuments (file:///C:/Users/agust/OneDrive/Escritorio/backend/Preentrega3/src/controllers/users.controller.js:40:19) 
//     supuestamente significa que no que estoy tratando de hacer en forEach no es un array lo cual es raro porque si hago un console.log (files) me da un array o eso parece al menos pero BundleContextImpl, hay que revisar eso. ya se guarda la imagen de profiles en profiles. despuesz hayq ue hacer lo de diferenciar  cada document para verificar que sea un user premium y listo!