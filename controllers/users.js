const { validationResult } = require('express-validator')
const { hash, genSalt, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { generateToken } = require('../middleware/verify')
const HttpError = require('../models/http-error')
const UserModel = require('../models/users')

exports.getUsers = async (request, response, next) => {
   
    let users

    try {
        users = await UserModel.find(new Object(), '-passcode')
        response.status(200).json(users)
    } catch (error) {
        return next(new HttpError(error, 500))
    }
    //response.status(200).json({ users: users.map((user) => user.toObject({ getters: true }))})
}


exports.register = async (request, response, next) => {
    const error = validationResult(request)
    if (!error.isEmpty()) return next(new HttpError('Invalid Data, check your inputs', 422))
    else {
            let register, hashed, salt, token
            //could destruct request but cannot reuse variables once destructured
            //const { username, email, passcode } = request.body 
            try {
                const existing = await UserModel.findOne({ email: request.body.email })
                if (existing) return next(new HttpError(`User Email:${existing.email} already exists`, 422))
                else {
                    salt = await genSalt(10)
                    hashed = await hash(request.body.passcode, salt)
                    register = await UserModel.create({ 
                            username: request.body.username, 
                            email: request.body.email, 
                            passcode: hashed, 
                            image: request.file.path, 
                            places: Array() 
                    })

                    token = generateToken(register)
                    //destruct to exclude passcode    
                    let { passcode,  ...user } =  user._doc  
                    response.status(200).json({ user, token })
                }
            } catch (error) {
                return next(new HttpError(error, 500))
            } 
                
    }
}

exports.login = async (request, response, next) => {
    let existing, check, token 
    //const { email, passcode } = request.body

    try {
        existing = await UserModel.findOne({ email: request.body.email})
        check = await compare(request.body.passcode, existing.passcode)
        if (!existing) return next(new HttpError('Email not found', 403))
        else if(!check) return next(new HttpError('Invalid Passcode', 403))
        else {
            token = generateToken(existing)
            //destruct to exclude passcode
            let { passcode, ...user} = existing._doc
            response.status(200).json({ user, token})
        } 
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}
