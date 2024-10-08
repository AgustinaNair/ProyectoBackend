import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname  } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `./docUserPremium/${file.fieldname}`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
export const uploader = multer({
    storage
})