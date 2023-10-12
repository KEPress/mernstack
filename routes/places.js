const { Router } = require('express')
const { check } = require('express-validator')
const { upload } = require('../middleware/uploads')
const { verifyToken } = require('../middleware/verify')
const { getPlace, getUserPlaces, getPlaces, addPlace, updatePlace, removePlace } = require('../controllers/places')


//MIDDLEWARE EXECUTED FROM LEFT TO RIGHT AFTER THE PATH: `/`
const router = Router()

router.get(`/:id`, getPlace).get(`/user/:uid`, getUserPlaces).get(`/`, getPlaces)

//Can use Array Constructor keyword or literal []
router.post(`/`, verifyToken, upload.single('image') ,Array(check('title').not().isEmpty(), 
                   check('details').isLength({ min: 5 }), 
                   check('address').not().isEmpty()),  addPlace)

router.patch(`/:id`, verifyToken, Array(check('title').not().isEmpty(),
                     check('details').isLength({ min: 5})), updatePlace)

router.delete(`/:id`, verifyToken, removePlace)

module.exports = router