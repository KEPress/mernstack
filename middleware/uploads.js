const { v1: uuid } = require('uuid')
const multer = require('multer')

const MIME_TYPE = { 'image/png':'png', 'image/jpeg':'jpeg', 'image/jpg':'jpg' }

//multer configuration
exports.upload = multer({ 
    limits: 500000, 
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, 'uploads/images')
        },
        filename: (request, file, callback) => {
            const extension = MIME_TYPE[file.mimetype]
            callback(null, uuid() + '.' + extension)
        }
    }),
    fileFilter: (request, file, callback) => {
        const valid = !!MIME_TYPE[file.mimetype]
        let error  = valid ? (null):(new Error('Invalid mime type'))
        callback(error, valid)
    }
})
