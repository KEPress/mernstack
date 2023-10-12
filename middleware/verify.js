const { sign, verify} = require('jsonwebtoken')
const HttpError = require('../models/http-error')

exports.generateToken = (user) => {
    //You can specify what values to tokenize e.g. (id: user.id)
    //NOTE: to access values stored with token it's request.user.valueName 
    //In the case of id or email request.user.id inside any controller function
    return sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h'})
}

exports.verifyToken = (request, response, next) => {

    if (request.method === 'OPTIONS') return next()
    
    try {
        const header = request.headers.authorization
        if (header) {
            const token = header.slice(7, header.length)
            verify(token, process.env.JWT_SECRET, (error, decode) => {
                if (error) response.status(403).json(error)
                else request.user = decode
                next()
            })
        } else response.status(401).json({ message: 'Not Authenticated'})
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}