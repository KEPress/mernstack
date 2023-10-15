const { validationResult } = require('express-validator')
const { v4: uuid } = require('uuid')
const fileSystem = require('fs')
const HttpError = require('../models/http-error')
const { getAddressCoordinates } = require('../utilities/location')
const PlaceModel = require('../models/places')
const UserModel = require('../models/users')
const { default: mongoose } = require('mongoose')
const { error } = require('console')
const places = require('../models/places')


exports.getPlace = async (request, response, next) => {
    
    let place
    const id = request.params.id

    try {
        place = await PlaceModel.findById(id)
        if (!place) return next(new HttpError('Could not get Place', 404))
        else response.status(200).json({ place: place.toObject( { getters: true })})
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}

exports.getPlaces = async (request, response, next) => {

    let places 
    try {
        places = await PlaceModel.find()
        if (!places) return next(new HttpError('No Records', 404))
        else response.status(200).json(places)
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}

exports.getUserPlaces = async (request, response, next) => {
  
    let places 
    const userId = request.params.uid
  
    try {
       places = await UserModel.findById(userId).populate('places')
       if (!places || places.length === 0) return next(new HttpError('Could not get User Places', 401))
       else response.status(200).json(places)   
    } catch (error) {
        return next(new HttpError(error, 500))    
    }
}

exports.addPlace = async (request, response, next) => {
    
    const error = validationResult(request)
    if (!error.isEmpty()) return next(new HttpError('Invalid Data, check your inputs', 422))
    else {
            let location, user
            const { title, details, address } = request.body
        
            try {
                location = await getAddressCoordinates(address)
            } catch (error) {
                return next(error)
            }

            try {
                user = await UserModel.findById(request.user._id)
                if (!user) return next(new HttpError('User credentials do not match', 404))
                else { 
                        const session = await mongoose.startSession()
                        session.startTransaction()
                        const createPlace = await PlaceModel.create({
                            session: session, 
                            title, details, image: request.file.path, 
                            address, location: location, author: request.user._id
                        })
                        user.places.push(createPlace)
                        await user.save({ session: session })    
                        session.commitTransaction()

                    response.status(201).json(createPlace)
                }
            } catch (error) {
                return next(new HttpError(error, 500))
            }
        }   
}

exports.updatePlace = async (request, response, next) => {
    
    const error = validationResult(request)
    if (!error.isEmpty()) return next(new HttpError('Invalid Data, check your inputs', 422))
    else {

        let update
        const { title, details } = request.body
        const placeId = request.params.id 
        const userId = request.user._id

        try {
             update = await PlaceModel.findByIdAndUpdate(placeId, { title: title, details: details}, { new: true})
            //Check if that user is the one who created the place
            if (!update) return next(new HttpError('Place not found', 500))
            else if (update.author.toString() !== userId) return next(new HttpError('Unauthorized', 403))
            else response.status(201).json(update)
        } catch (error) {
            return next(new HttpError(error, 500))
        }
    } 
}   


exports.removePlace = async (request, response, next) => {
    
    let place
    const placeId = request.params.id

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        place = await PlaceModel.findByIdAndDelete(placeId).populate('author').session(session)
        const image = place.image
        if (!place) {
            await session.abortTransaction()
            session.endSession()
            return next(new HttpError('Place not found', 404))
        } else if (!place.author || !place.author.places) {
            await session.abortTransaction()
            session.endSession()
            return next(new HttpError('Author undefined', 500))
        } else if (place.author.id !== request.user._id) {
            return next(new HttpError('UnAuthorized to Remove', 401))
        } else {
            place.author.places.pull(place)
            await place.author.save({ session: session })
            await session.commitTransaction()
            session.endSession()
            
            //remove successful
            response.status(200).json({message: 'Place Deleted'})
            fileSystem.unlink(image, (error) => console.log(error))
        }
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}