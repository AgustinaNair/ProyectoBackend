import {Router} from 'express'
import UsersController from '../../controllers/users.controller.js'
import { authorization } from '../../middlewares/authorization.middleware.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { uploader } from '../../utils.js'

const router = Router()
const {getUsers, uploadDocuments, updatePremium, deleteUsers, updateRole, deleteUser} = new UsersController()

router.get('/',                 passportCall('jwt'), authorization('admin'), getUsers)
router.post('/:uid/documents',  uploader.fields([
                                    { name: 'profiles', maxCount: 1 }, 
                                    { name: 'products', maxCount: 1 },
                                    { name: 'documents', maxCount: 1 }
                                ]),uploadDocuments)
router.put('/premium/:uid',     updatePremium)
router.put('/role/:uid',        updateRole)
// vista para eliminar a los users sin actividad por mas de dos dias 
router.delete('/',              passportCall('jwt'), authorization('admin'), deleteUsers)
router.delete('/:uid',           passportCall('jwt'), authorization('admin'), deleteUser)


export default router