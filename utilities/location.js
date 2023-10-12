const axios = require('axios')
const HttpError = require('../models/http-error')


/**
 * 
 * CHEAP METHOD WITHOUT GOOGLE SETUP
 * @returns address coordinates
 * 
 * exports.getCoordinateCheap = async () => {
    return { lat: 40.7484405, lng: -73.9878584 }
}
 */

exports.getAddressCoordinates = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.MAP_API_KEY}`)

    const data = response.data

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('Could not map location for address specified', 422)
        throw error
    }
    const coordinates = data.results[0].geometry.location
    return coordinates
}
