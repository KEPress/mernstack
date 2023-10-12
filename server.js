//NOTE: MIDDLEWARES ARE PARSED FROM TOP TO BOTTOM
const express = require('express'), cors = require('cors')
const fileSystem = require('fs'), path = require('path')
const helmet = require('helmet'), morgan = require('morgan')
const mongoose = require('mongoose')
const HttpError = require('./models/http-error')
const places = require('./routes/places')
const users = require('./routes/users')
const server = express()


//Parse JSON Data
server.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Credentials', true)
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT')
    next()
}).use(cors({
    origin: `http://localhost:3000`,
    credentials: true
})).use(express.json())
.use(express.urlencoded({ extended: false }))
.use(`/uploads/images`, express.static(path.join('uploads', 'images')))
.use(helmet()).use(morgan('common'))


//Routes
server.use(`/api/places`, places).use(`/api/users`, users)


//Error Handling
server.use((request, response, next) => {
    const error = new HttpError('Could not find route', 404)
    next(error)
}).use((error, request, response, next) => {
    if (request.file) {
        fileSystem.unlink(request.file.path, (error) => {
            console.log(error)
        })
    }
    if (response.headerSent) return next(error)
    response.status(error.code || 500)
    response.json({ message: error.message || ('An unknown error occured')})
})

//DATABASE SETUP & CONNECTION - Start Backend API Server
mongoose.connect(process.env.MONGO_URI)
.then(() => server.listen(process.env.PORT || (5000), () => console.log('Server Online')))
.catch((error) => console.log(error))

