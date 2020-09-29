const axios = require('axios')

class APIController {
    static searchImage (req, res, next) {
        const { q } = req.query
        // return console.log ('>>>>', q)
        const key = process.env.API_KEY_PIXABAY
        axios({
            method: 'GET',
            url: `https://pixabay.com/api/?key=${key}&q=${q}`
        }).then(( { data } ) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return next(err)
        })
    }

    static getWeather (req, res, next) {
        const location = req.body.location  || 'Jakarta'
        const key = process.env.API_KEY_WEATHERSTACK
        axios({
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