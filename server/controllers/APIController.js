const axios = require('axios')

class APIController {

    // ! MOVED TO USER EDIT / REPLACE CONTROLLER
    static async searchImage (req, res, next) {
        console.log ('masuk searchImage')
        const { img_title } = req.body
        // return console.log ('>>>>', q)
        const key = process.env.API_KEY_PIXABAY
        await axios({
            method: 'GET',
            url: `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(img_title)}`
        }).then(( {data} ) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return next(err)
        })
    }

    static async getWeather (req, res, next) {
        const location = req.userData.location
        const key = process.env.API_KEY_WEATHERSTACK
        console.log (location, key)
        await axios({
            method: 'GET',
            url: `http://api.weatherstack.com/current?access_key=${key}&query=${location}`
        }).then(( { data } ) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return next(err)
        })
    }
}

module.exports = APIController