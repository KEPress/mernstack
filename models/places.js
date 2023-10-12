const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        lat: { type: Number },
        lng: { type: Number }
    },
    //NOTE: must have 'ref' can't use refer otherwise relations won't work
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model('Places', placeSchema)