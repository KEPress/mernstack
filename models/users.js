const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    passcode: {
        type: String,
        minlength: 6,
        required: true
    },

    image: { 
        type: String 
    },

    //NOTE: must have 'ref' can't use refer otherwise relations won't work
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true
    }]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Users', userSchema)